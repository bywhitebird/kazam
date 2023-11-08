import { parse as parseTypescript } from '@babel/parser'
import traverseTypescriptAst, { type NodePath } from '@babel/traverse'
import type { AssignmentExpression, UpdateExpression } from '@babel/types'
import { type KazAst, traverse as traverseKazAst } from '@whitebird/kaz-ast'
import { kazamMagicStrings } from '@whitebird/kazam-transform-utils'
import { TransformerTypescript } from '@whitebird/kazam-transformer-typescript'
import StringManipulator from 'magic-string'

export const transformAst = (astKaz: KazAst, options: {
  fileName: string
}): void => {
  const transformerTypescript = new TransformerTypescript({
    [options.fileName]: {
      ast: astKaz,
      sourceAbsoluteFilePath: options.fileName,
      getTransformedOutputFilePath: (filePath: string) => filePath,
    },
  }, {
    withKazamInternalJsDoc: true,
  })

  const tsFiles = transformerTypescript.transformAndGenerateMappings()
  const tsFile = tsFiles[`${options.fileName}.ts`]

  if (tsFile === undefined)
    throw new Error('tsFile is undefined')

  const astTypescript = parseTypescript(tsFile.content, {
    sourceType: 'module',
    plugins: [
      'typescript',
    ],
  })

  // TODO: Currently, we mark the state setters. We should also mark the state getters and computed getters.
  // We could traverse all identifiers instead of AssignmentExpression and UpdateExpression.
  // We could traverse identifiers, check if their binding has a trailing comment with the magic string,
  // and then categorize them as state setters, state getters, or computed getters. (if they are state setters, we should categorize the AssignmentExpression or UpdateExpression as a state setter, not the identifier).
  // To categorize them, we could check if the identifier's parent is an AssignmentExpression or UpdateExpression. If it is, we could categorize it as a state setter. Otherwise, we could categorize it as a state getter or computed getter according to the comment.

  const updateAndAssignmentExpressions: NodePath<UpdateExpression | AssignmentExpression>[] = []
  traverseTypescriptAst(astTypescript, {
    AssignmentExpression(path) {
      updateAndAssignmentExpressions.push(path)
    },
    UpdateExpression(path) {
      updateAndAssignmentExpressions.push(path)
    },
  })

  traverseKazAst(astKaz, {
    $default(node) {
      const getExpression = (n: typeof node): { $range: [number, number]; $value: string } | undefined => {
        const expressionKey = Object.keys(n).find(key => key.toLowerCase().includes('expression')) as keyof typeof n | undefined

        if (expressionKey === undefined) {
          for (const key in n) {
            const value = n[key as keyof typeof n]

            if (Array.isArray(value)) {
              for (const item of value) {
                if ('$type' in item) {
                  const expression = getExpression(item)
                  if (expression !== undefined)
                    return expression
                }
              }
            }
            else if (typeof value === 'object' && value !== null && '$type' in value) {
              const expression = getExpression(value)
              if (expression !== undefined)
                return expression
            }
          }

          return undefined
        }

        const expression = node[expressionKey]

        if (expression === undefined || typeof expression !== 'object' || expression === null)
          return undefined

        return expression
      }

      const expression = getExpression(node)

      if (expression === undefined)
        return

      const matchedTypescriptExpressionNodePath = tsFile.mapping.find((mapping) => {
        return mapping.sourceRange[0] === expression.$range[0] && mapping.sourceRange[1] === expression.$range[1]
      })

      if (matchedTypescriptExpressionNodePath === undefined)
        return

      const typescriptExpressionNodePaths = updateAndAssignmentExpressions.filter((updateOrAssignmentExpression) => {
        const { start, end } = updateOrAssignmentExpression.node
        if (start === undefined || end === undefined || start === null || end === null)
          return false

        return matchedTypescriptExpressionNodePath.generatedRange[0] <= start && end <= matchedTypescriptExpressionNodePath.generatedRange[1]
      })

      if (typescriptExpressionNodePaths === undefined)
        return

      const expressionStringManipulator = new StringManipulator(expression.$value)

      for (const typescriptExpressionNodePath of typescriptExpressionNodePaths) {
        const identifier = typescriptExpressionNodePath.isAssignmentExpression()
          ? typescriptExpressionNodePath.node.left
          : (typescriptExpressionNodePath.isUpdateExpression() && typescriptExpressionNodePath.node.argument) || undefined

        if (identifier === undefined || identifier.type !== 'Identifier')
          return

        const binding = typescriptExpressionNodePath.scope.getBinding(identifier.name)

        if (binding?.identifier.trailingComments?.some((comment) => {
          return new RegExp(`^ *\\* *${kazamMagicStrings.kazStateJSDoc.regexp.source} *$`).test(comment.value)
        })) {
          const startExpressionSetter = typescriptExpressionNodePath.node.start! - matchedTypescriptExpressionNodePath.generatedRange[0]
          const endExpressionSetter = typescriptExpressionNodePath.node.end! - matchedTypescriptExpressionNodePath.generatedRange[0]

          expressionStringManipulator.update(
            startExpressionSetter,
            endExpressionSetter,
            kazamMagicStrings.setState.create(
              identifier.name,
              expression.$value.slice(startExpressionSetter, endExpressionSetter),
            ),
          )
        }
      }

      expression.$value = expressionStringManipulator.toString()
    },
  })
}
