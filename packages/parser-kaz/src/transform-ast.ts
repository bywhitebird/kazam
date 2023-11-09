import { parse as parseTypescript } from '@babel/parser'
import traverseTypescriptAst, { type NodePath } from '@babel/traverse'
import type { Identifier } from '@babel/types'
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

  const replacements: (
    { type: 'stateSetter' | 'computedGetter' | 'stateGetter'; identifierPath: NodePath<Identifier>; pathToReplace?: NodePath }
  )[] = []

  traverseTypescriptAst(astTypescript, {
    Identifier(path) {
      if (path.parentPath.isVariableDeclarator())
        return

      if (path.parentPath.isMemberExpression() && path.parentPath.node.property === path.node)
        return

      const binding = path.scope.getBinding(path.node.name)

      if (binding === undefined)
        return

      let type: 'state' | 'computed' | undefined
      for (const comment of binding?.identifier.trailingComments ?? []) {
        if (new RegExp(`^ *\\* *${kazamMagicStrings.kazStateJSDoc.regexp.source} *$`).test(comment.value))
          type = 'state'
        else if (new RegExp(`^ *\\* *${kazamMagicStrings.kazComputedJSDoc.regexp.source} *$`).test(comment.value))
          type = 'computed'

        if (type !== undefined)
          break
      }

      if (type === undefined)
        return

      switch (type) {
        case 'state': {
          if (path.parentPath.isUpdateExpression())
            replacements.push({ type: 'stateSetter', identifierPath: path, pathToReplace: path.parentPath })
          else if (path.parentPath.isAssignmentExpression() && path.parentPath.node.left === path.node)
            replacements.push({ type: 'stateSetter', identifierPath: path, pathToReplace: path.parentPath })
          else
            replacements.push({ type: 'stateGetter', identifierPath: path })
          break
        }
        case 'computed': {
          replacements.push({ type: 'computedGetter', identifierPath: path })
          break
        }
      }
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

      const typescriptExpressionNodePaths = replacements.filter((replacement) => {
        const { start, end } = (replacement.pathToReplace ?? replacement.identifierPath).node
        if (start === undefined || end === undefined || start === null || end === null)
          return false

        return matchedTypescriptExpressionNodePath.generatedRange[0] <= start && end <= matchedTypescriptExpressionNodePath.generatedRange[1]
      })

      if (typescriptExpressionNodePaths === undefined)
        return

      const expressionStringManipulator = new StringManipulator(expression.$value)

      typescriptExpressionNodePaths.sort((a) => {
        if (a.type.toLowerCase().endsWith('getter'))
          return -1

        return 1
      })

      for (const typescriptExpressionNodePath of typescriptExpressionNodePaths) {
        const startExpressionSetter = (typescriptExpressionNodePath.pathToReplace ?? typescriptExpressionNodePath.identifierPath).node.start! - matchedTypescriptExpressionNodePath.generatedRange[0]
        const endExpressionSetter = (typescriptExpressionNodePath.pathToReplace ?? typescriptExpressionNodePath.identifierPath).node.end! - matchedTypescriptExpressionNodePath.generatedRange[0]

        let magicString: string | undefined
        if (typescriptExpressionNodePath.type === 'stateSetter') {
          magicString = kazamMagicStrings.setState.create(
            typescriptExpressionNodePath.identifierPath.node.name,
            expressionStringManipulator.slice(startExpressionSetter, endExpressionSetter),
          )
        }
        else if (typescriptExpressionNodePath.type === 'stateGetter') {
          magicString = kazamMagicStrings.getState.create(
            typescriptExpressionNodePath.identifierPath.node.name,
          )
        }
        else if (typescriptExpressionNodePath.type === 'computedGetter') {
          magicString = kazamMagicStrings.getComputed.create(
            typescriptExpressionNodePath.identifierPath.node.name,
          )
        }

        if (magicString === undefined)
          continue

        expressionStringManipulator.update(
          startExpressionSetter,
          endExpressionSetter,
          magicString,
        )
      }

      expression.$value = expressionStringManipulator.toString()
    },
  })
}
