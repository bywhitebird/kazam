import type * as babelParser from '@babel/parser'
import traverse, { type NodePath } from '@babel/traverse'
import type { AssignmentExpression, UpdateExpression } from '@babel/types'
import type { KazAst, kazStateInstructionSchema, kazTemplateExpressionSchema } from '@whitebird/kaz-ast'
import type { TransformerTypescript } from '@whitebird/kazam-transformer-typescript'
import type { z } from 'zod'

import { upperFirst } from './upperFirst'

type TransformerTypescriptGenerated = Awaited<ReturnType<TransformerTypescript['transformAndGenerateMappings']>>[string]
type TypescriptAst = ReturnType<typeof babelParser.parse>
type Mapping = TransformerTypescriptGenerated['mapping'][number]
type KazExpression = z.infer<typeof kazTemplateExpressionSchema>['expression']
type StateInstruction = z.infer<typeof kazStateInstructionSchema>

export function transformExpression(
  kazExpression: KazExpression,
  { kazAst, typescriptFileContent, typescriptMapping, typescriptAst }: {
    kazAst: KazAst
    typescriptFileContent: string
    typescriptMapping: Mapping[]
    typescriptAst: TypescriptAst
  },
) {
  let fixedExpression = kazExpression.$value;

  [
    transformSetStateInExpression,
  ].forEach((transform) => {
    fixedExpression = transform(kazExpression, { kazAst, typescriptFileContent, typescriptMapping, typescriptAst })
  })

  return fixedExpression
}

function transformSetStateInExpression(
  ...[kazExpression, { kazAst, typescriptMapping, typescriptAst }]: Parameters<typeof transformExpression>
) {
  let fixedExpression = kazExpression.$value
  let shift = 0

  // Find the corresponding Typescript expression range
  const typescriptExpressionRange = findCorrespondingTypescriptExpressionRange(kazExpression, typescriptMapping)

  // Find the node paths in the Typescript AST corresponding to the Kaz expression
  const nodePaths = findCorrespondingTypescriptExpressionNodePaths(typescriptExpressionRange, typescriptAst)

  // Find the states in the Kaz AST
  const states = findStates(kazAst)

  // Find the assigments to a state variable
  const assignments = findAssignmentsToStateVariable(states, nodePaths)

  for (const assignmentIdentifier of assignments) {
    // Find the range of the replacement expression
    const [start, end] = findReplacementExpressionRange(assignmentIdentifier, typescriptMapping)

    const identifier = (() => {
      if (assignmentIdentifier.isAssignmentExpression())
        return assignmentIdentifier.get('left')

      if (assignmentIdentifier.isUpdateExpression())
        return assignmentIdentifier.get('argument')

      throw new Error('Expected assignment or update expression')
    })()

    if (!identifier.isIdentifier())
      throw new Error('Expected identifier')

    const replacement = `set${upperFirst(identifier.node.name)}((${identifier.node.name}) => {
        ${fixedExpression.slice(start + shift, end + shift)};
        return ${identifier.node.name};
      })`

    fixedExpression = fixedExpression.slice(0, start + shift) + replacement + fixedExpression.slice(end + shift)
    shift += replacement.length - (end - start)
  }

  return fixedExpression
}

function findCorrespondingTypescriptExpressionRange(
  kazExpression: KazExpression,
  typescriptMapping: Mapping[],
) {
  const typescriptExpression = typescriptMapping.find(mapping => mapping.sourceRange[0] === kazExpression.$range[0] && mapping.sourceRange[1] === kazExpression.$range[1])

  if (typescriptExpression === undefined)
    throw new Error('Could not find corresponding Typescript expression')

  return typescriptExpression.generatedRange
}

function findCorrespondingTypescriptExpressionNodePaths(
  searchRange: [number, number],
  typescriptAst: TypescriptAst,
) {
  const nodePaths: NodePath[] = []

  traverse(typescriptAst, {
    enter(path) {
      const node = path.node

      if (node.start === undefined || node.start === null || node.end === undefined || node.end === null)
        return

      if (node.start >= searchRange[0] && node.end <= searchRange[1])
        nodePaths.push(path)
    },
  })

  return nodePaths
}

function findStates(kazAst: KazAst) {
  return kazAst.instructions.filter((instruction): instruction is StateInstruction => instruction.$type === 'StateInstruction')
}

function findAssignmentsToStateVariable(
  stateInstructions: StateInstruction[],
  nodePaths: NodePath[],
) {
  const assignmentIdentifiers: NodePath<AssignmentExpression | UpdateExpression>[] = []

  for (const nodePath of nodePaths) {
    const parentNodePath = nodePath.parentPath

    if (parentNodePath === null)
      continue

    if (!parentNodePath.isAssignmentExpression() && !parentNodePath.isUpdateExpression())
      continue

    if (assignmentIdentifiers.includes(parentNodePath))
      continue;

    const updatedNodePath = parentNodePath.isAssignmentExpression()
      ? parentNodePath.get('left')
      : parentNodePath.isUpdateExpression()
        ? parentNodePath.get('argument')
        : null

    if (updatedNodePath === null)
      continue

    if (!updatedNodePath.isIdentifier())
      continue

    if (stateInstructions.some(stateInstruction => stateInstruction.name.$value === updatedNodePath.node.name))
      assignmentIdentifiers.push(parentNodePath)
  }

  return assignmentIdentifiers
}

function findReplacementExpressionRange(
  assignmentIdentifier: NodePath<AssignmentExpression | UpdateExpression>,
  typescriptMapping: Mapping[],
) {
  const [assigmentStart, assignmentEnd] = [assignmentIdentifier.node.start, assignmentIdentifier.node.end]

  if (assigmentStart === null || assigmentStart === undefined || assignmentEnd === null || assignmentEnd === undefined)
    throw new Error('Unexpected null or undefined value')

  const assignmentLength = assignmentEnd - assigmentStart

  const correspondingMapping = typescriptMapping.find(mapping =>
    mapping.generatedRange[0] <= assigmentStart && mapping.generatedRange[1] >= assignmentEnd,
  )

  if (correspondingMapping === undefined)
    throw new Error('Could not find corresponding mapping')

  const [typescriptStart, typescriptEnd] = correspondingMapping.generatedRange
  const [kazStart, kazEnd] = correspondingMapping.sourceRange

  if (typescriptStart - kazStart !== typescriptEnd - kazEnd)
    throw new Error('Unexpected difference in length')

  const start = assigmentStart - typescriptStart
  const end = start + assignmentLength

  return [start, end] as const
}
