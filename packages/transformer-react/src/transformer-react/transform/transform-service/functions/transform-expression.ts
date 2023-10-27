/* eslint-disable @typescript-eslint/no-use-before-define */

import * as babelParser from '@babel/parser'
import traverse, { type NodePath } from '@babel/traverse'
import type { AssignmentExpression, UpdateExpression } from '@babel/types'
import type { KazAst, kazStateInstructionSchema, kazTemplateExpressionSchema } from '@whitebird/kaz-ast'
import { TransformerTypescript } from '@whitebird/kazam-transformer-typescript'
import { Effect, pipe } from 'effect'
import { upperFirst } from 'lodash'
import type { z } from 'zod'

import { TransformService } from '../transform-service'

type KazExpression = z.infer<typeof kazTemplateExpressionSchema>['expression']

type StateInstruction = z.infer<typeof kazStateInstructionSchema>

export const transformExpression = (
  kazExpression: KazExpression,
) =>
  pipe(
    Effect.all([Effect.succeed(kazExpression), Effect.succeed(kazExpression.$value)]),
    Effect.flatMap(transformSetStateInExpression),
    // Add other transformations here
  ).pipe(
    Effect.map(([, fixedExpression]) => fixedExpression),
  )

const transformToTypescript = () =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    const metadata = yield * _(transformService.getMetadata())

    const kazAst = metadata.input[metadata.filePath]

    if (kazAst === undefined)
      throw new Error(`No AST found for file ${metadata.filePath}`)

    const transformerTypescript = new TransformerTypescript({
      [metadata.componentName]: kazAst,
    }, {})

    const result = transformerTypescript.transformAndGenerateMappings()[metadata.componentName]

    if (result === undefined)
      throw new Error(`No result found for component ${metadata.componentName}`)

    const ast = babelParser.parse(result.content, {
      sourceType: 'module',
      plugins: ['typescript'],
    })

    const resultWithAst = {
      ...result,
      ast,
    }

    return resultWithAst
  })

const transformSetStateInExpression = (
  [kazExpression, fixedExpression]: [KazExpression, string],
) => Effect.gen(function* (_) {
  const assignments = yield * _(
    pipe(
      // Find the corresponding Typescript expression range
      findCorrespondingTypescriptExpressionRange(kazExpression),
      // Find the node paths in the Typescript AST corresponding to the Kaz expression
      Effect.flatMap(findCorrespondingTypescriptExpressionNodePaths),
      // Find the assigments to a state variable
      Effect.flatMap(findAssignmentsToStateVariable),
    ),
  )

  let shift = 0

  for (const assignmentIdentifier of assignments) {
    // Find the range of the replacement expression
    const [start, end] = yield * _(findReplacementExpressionRange(assignmentIdentifier))

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

  return [kazExpression, fixedExpression] as const
})

const findCorrespondingTypescriptExpressionRange = (
  kazExpression: KazExpression,
) =>
  Effect.gen(function* (_) {
    const { mapping: typescriptMapping } = yield * _(transformToTypescript())

    const typescriptExpression = typescriptMapping.find(mapping =>
      mapping.sourceRange[0] === kazExpression.$range[0] && mapping.sourceRange[1] === kazExpression.$range[1])

    if (typescriptExpression === undefined)
      throw new Error('Could not find corresponding Typescript expression')

    return typescriptExpression.generatedRange
  })

const findCorrespondingTypescriptExpressionNodePaths = (
  searchRange: [number, number],
) => Effect.gen(function* (_) {
  const nodePaths: NodePath[] = []

  yield * _(
    pipe(
      transformToTypescript(),
      Effect.map(({ ast: typescriptAst }) => typescriptAst),
      Effect.map(ast =>
        traverse(ast, {
          enter(path) {
            const node = path.node

            if (node.start === undefined || node.start === null || node.end === undefined || node.end === null)
              return

            if (node.start >= searchRange[0] && node.end <= searchRange[1])
              nodePaths.push(path)
          },
        }),
      ),
    ),
  )

  return nodePaths
})

const findStates = (kazAst: KazAst) =>
  Effect.gen(function* () {
    return kazAst.instructions.filter(
      (instruction): instruction is StateInstruction => instruction.$type === 'StateInstruction',
    )
  })

const findAssignmentsToStateVariable = (
  nodePaths: NodePath[],
) => Effect.gen(function* (_) {
  const transformService = yield * _(TransformService)

  const metadata = yield * _(transformService.getMetadata())

  const kazAst = metadata.input[metadata.filePath]?.ast

  if (kazAst === undefined)
    throw new Error(`No AST found for file ${metadata.filePath}`)

  const stateInstructions = yield * _(findStates(kazAst))

  const assignmentIdentifiers = new Set<NodePath<AssignmentExpression | UpdateExpression>>()

  for (const nodePath of nodePaths) {
    const parentNodePath = nodePath.parentPath

    if (parentNodePath === null)
      continue

    if (!parentNodePath.isAssignmentExpression() && !parentNodePath.isUpdateExpression())
      continue

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
      assignmentIdentifiers.add(parentNodePath)
  }

  return assignmentIdentifiers
})

const findReplacementExpressionRange = (
  assignmentIdentifier: NodePath<AssignmentExpression | UpdateExpression>,
) => Effect.gen(function* (_) {
  const { mapping: typescriptMapping } = yield * _(transformToTypescript())

  const [assigmentStart, assignmentEnd] = [assignmentIdentifier.node.start, assignmentIdentifier.node.end]

  if (assigmentStart === null || assigmentStart === undefined || assignmentEnd === null || assignmentEnd === undefined)
    throw new Error('Unexpected null or undefined value')

  const assignmentLength = assignmentEnd - assigmentStart

  const correspondingMapping = typescriptMapping.find(mapping =>
    mapping.generatedRange[0] <= assigmentStart && mapping.generatedRange[1] >= assignmentEnd,
  )

  if (correspondingMapping === undefined)
    throw new Error('Could not find corresponding mapping')

  const [typescriptStart] = correspondingMapping.generatedRange

  const start = assigmentStart - typescriptStart
  const end = start + assignmentLength

  return [start, end] as const
})
