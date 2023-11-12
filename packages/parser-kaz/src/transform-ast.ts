import { parse as parseTypescript } from '@babel/parser'
import traverseTypescriptAst, { type NodePath } from '@babel/traverse'
import type { Identifier } from '@babel/types'
import { type KazAst, traverse as traverseKazAst } from '@whitebird/kaz-ast'
import { kazamMagicStrings } from '@whitebird/kazam-transform-utils'
import { TransformerTypescript } from '@whitebird/kazam-transformer-typescript'
import StringManipulator from 'magic-string'

type PathType = 'stateSetter' | 'computedGetter' | 'stateGetter' | 'propGetter'

export const transformAst = (
  kazAst: KazAst,
  options: { fileName: string },
): void => {
  const typescriptFile = generateTypescriptFileAndMappings(kazAst, options)

  const typescriptAst = parseTypescript(typescriptFile.content, {
    sourceType: 'module',
    plugins: ['typescript'],
  })

  const pathsToReplace = findPathsToReplace(typescriptAst)

  replacePaths(
    kazAst,
    pathsToReplace,
    typescriptFile,
  )
}

function createTransformerTypescript(
  kazAst: KazAst,
  options: { fileName: string },
) {
  return new TransformerTypescript({
    [options.fileName]: {
      ast: kazAst,
      sourceAbsoluteFilePath: options.fileName,
      getTransformedOutputFilePath: (filePath: string) => filePath,
    },
  }, {
    withKazamInternalJsDoc: true,
  })
}

function generateTypescriptFileAndMappings(
  kazAst: KazAst,
  options: { fileName: string },
) {
  const transformerTypescript = createTransformerTypescript(kazAst, options)

  const typescriptFiles = transformerTypescript.transformAndGenerateMappings()
  const typescriptFile = typescriptFiles[`${options.fileName}.ts`]

  if (typescriptFile === undefined)
    throw new Error('tsFile is undefined')

  return typescriptFile
}

function findPathsToReplace(typescriptAst: ReturnType<typeof parseTypescript>) {
  const pathsToReplace = new Set<{
    type: PathType
    identifierPath: NodePath<Identifier>
    pathToReplace?: NodePath
  }>()

  traverseTypescriptAst(typescriptAst, {
    Identifier(path) {
      if (path.parentPath.isVariableDeclarator())
        return

      if (path.parentPath.isMemberExpression() && path.parentPath.node.property === path.node)
        return

      const pathType = getPathType(path)

      if (pathType === undefined)
        return

      addPathToReplace(pathsToReplace, path, pathType)
    },
  })

  return pathsToReplace
}

function getPathType(path: NodePath<Identifier>) {
  const binding = path.scope.getBinding(path.node.name)

  if (binding === undefined)
    return

  for (const comment of binding?.identifier.trailingComments ?? []) {
    if (new RegExp(`^ *\\* *${kazamMagicStrings.kazStateJSDoc.regexp.source} *$`).test(comment.value))
      return 'state'

    if (new RegExp(`^ *\\* *${kazamMagicStrings.kazComputedJSDoc.regexp.source} *$`).test(comment.value))
      return 'computed'

    if (new RegExp(`^ *\\* *${kazamMagicStrings.kazPropJSDoc.regexp.source} *$`).test(comment.value))
      return 'prop'
  }

  return undefined
}

function addPathToReplace(
  pathsToReplace: Set<{
    type: PathType
    identifierPath: NodePath<Identifier>
    pathToReplace?: NodePath
  }>,
  path: NodePath<Identifier>,
  type: NonNullable<ReturnType<typeof getPathType>>,
) {
  switch (type) {
    case 'state': {
      if (
        path.parentPath.isUpdateExpression()
        || (path.parentPath.isAssignmentExpression() && path.parentPath.node.left === path.node)
      ) {
        pathsToReplace.add({
          type: 'stateSetter',
          identifierPath: path,
          pathToReplace: path.parentPath,
        })
        break
      }

      pathsToReplace.add({
        type: 'stateGetter',
        identifierPath: path,
      })
      break
    }
    case 'computed': {
      pathsToReplace.add({
        type: 'computedGetter',
        identifierPath: path,
      })
      break
    }
    case 'prop': {
      pathsToReplace.add({
        type: 'propGetter',
        identifierPath: path,
      })
      break
    }
  }
}

function replacePaths(
  kazAst: KazAst,
  pathsToReplace: Set<{
    type: PathType
    identifierPath: NodePath<Identifier>
    pathToReplace?: NodePath
  }>,
  typescriptFile: ReturnType<typeof generateTypescriptFileAndMappings>,
) {
  traverseKazAst(kazAst, {
    enter(node) {
      const expression = getKazExpression(node)

      if (expression === undefined)
        return

      const typescriptMappedRange = getTypescriptMappedRange(typescriptFile, expression)

      const pathsInRange = sortPathsByType(
        findPathsInRange(pathsToReplace, typescriptMappedRange),
        ['stateGetter', 'computedGetter', 'propGetter', 'stateSetter'],
      )

      const expressionStringManipulator = new StringManipulator(expression.$value)

      applyPathsReplacements(
        pathsInRange,
        expressionStringManipulator,
        typescriptMappedRange,
      )

      expression.$value = expressionStringManipulator.toString()
    },
  })
}

function getKazExpression(
  node: Parameters<NonNullable<Parameters<typeof traverseKazAst>[1]['enter']>>[0],
): { $range: [number, number]; $value: string } | undefined {
  // Handle special cases (e.g. `IfLogical`, `ElseIfLogical`, `ForLogical`)

  if (node.$type === 'IfLogical' || node.$type === 'ElseLogical') {
    const condition = node.$type === 'IfLogical'
      ? node.condition
      : 'if' in node
        ? node.if.condition
        : undefined

    if (condition === undefined)
      return

    return condition
  }

  if (node.$type === 'ForLogical')
    return node.parameters

  // Handle generic cases

  const expressionKey = (
    Object.keys(node)
      .find(key => key.toLowerCase().includes('expression'))
  ) as keyof typeof node | undefined

  if (expressionKey !== undefined) {
    const expression = node[expressionKey] as never

    if (expression === undefined || typeof expression !== 'object' || expression === null)
      return

    return expression
  }

  for (const key in node) {
    const subNode = node[key as keyof typeof node]

    if (typeof subNode === 'object' && subNode !== null && !('$type' in subNode)) {
      const expression = getKazExpression(subNode)
      if (expression !== undefined)
        return expression
    }
  }

  return undefined
}

function getTypescriptMappedRange(
  typescriptFile: ReturnType<typeof generateTypescriptFileAndMappings>,
  expression: NonNullable<ReturnType<typeof getKazExpression>>,
) {
  const mappedRange = typescriptFile.mapping.find((mapping) => {
    return (
      mapping.sourceRange[0] === expression.$range[0]
      && mapping.sourceRange[1] === expression.$range[1]
    )
  })

  if (mappedRange === undefined)
    throw new Error(`mappedRange === undefined for range: ${JSON.stringify(expression.$range)}`)

  return mappedRange.generatedRange
}

function findPathsInRange(
  pathsToReplace: Set<{
    type: PathType
    identifierPath: NodePath<Identifier>
    pathToReplace?: NodePath
  }>,
  range: [number, number],
) {
  return Array.from(pathsToReplace).filter((path) => {
    const { start, end } = (path.pathToReplace ?? path.identifierPath).node
    if (start === undefined || end === undefined || start === null || end === null)
      return false

    return range[0] <= start && end <= range[1]
  })
}

function sortPathsByType(
  paths: ReturnType<typeof findPathsInRange>,
  types: typeof paths[number]['type'][],
) {
  return [...paths].sort((a, b) => {
    let aIndex = types.indexOf(a.type)
    let bIndex = types.indexOf(b.type)

    if (aIndex === -1)
      aIndex = types.length

    if (bIndex === -1)
      bIndex = types.length

    return aIndex - bIndex
  })
}

function applyPathsReplacements(
  paths: ReturnType<typeof sortPathsByType>,
  expressionStringManipulator: StringManipulator,
  range: [number, number],
) {
  for (const path of paths) {
    const startExpressionSetter = (path.pathToReplace ?? path.identifierPath).node.start! - range[0]
    const endExpressionSetter = (path.pathToReplace ?? path.identifierPath).node.end! - range[0]

    const magicString = getMagicString(
      path,
      expressionStringManipulator.slice(startExpressionSetter, endExpressionSetter),
    )

    if (magicString === undefined)
      continue

    expressionStringManipulator.update(
      startExpressionSetter,
      endExpressionSetter,
      magicString,
    )
  }
}

function getMagicString(
  path: Parameters<typeof applyPathsReplacements>[0][number],
  expression: string,
) {
  if (path.type === 'stateSetter') {
    return kazamMagicStrings.setState.create(
      path.identifierPath.node.name,
      expression,
    )
  }

  if (path.type === 'stateGetter') {
    return kazamMagicStrings.getState.create(
      path.identifierPath.node.name,
    )
  }

  if (path.type === 'computedGetter') {
    return kazamMagicStrings.getComputed.create(
      path.identifierPath.node.name,
    )
  }

  if (path.type === 'propGetter') {
    return kazamMagicStrings.getProp.create(
      path.identifierPath.node.name,
    )
  }

  return undefined
}
