/* eslint-disable @typescript-eslint/no-use-before-define */

import '@total-typescript/ts-reset'

import { Effect, Either, Layer, Ref, pipe } from 'effect'
import { match } from 'ts-pattern'

import { TokenNotMatch } from './errors/token-not-match'
import { SourceService, SourceServiceLive } from './services/source-service'
import { SourceStateServiceLive } from './services/source-state-service'

export const parse = (parameters: {
  source: string
}) => Effect.provideLayer(
  pipe(
    parameters.source,
    initSource,
    () => parseRoot,
  ),
  SourceServiceLive.pipe(
    Layer.use(SourceStateServiceLive(
      Ref.unsafeMake(parameters.source),
    )),
  ),
)

const initSource = (source: string) => Effect.gen(function* (_) {
  const sourceService = yield * _(SourceService)

  sourceService.initSource(source)
})

const parseRoot = Effect.gen(function* (_) {
  const instructions = yield * _(parseInstructions)

  const root = {
    $type: 'root' as const,
    instructions,
  }

  return root
})

const parseInstructions = Effect.gen(function* (_) {
  const sourceService = yield * _(SourceService)

  const instructions = yield * _(
    pipe(
      Effect.iterate(
        [] as Effect.Effect.Success<typeof parseInstruction>[],
        {
          while: instructions => instructions.length === 0 || instructions.at(-1) !== undefined,
          body: instructions => Effect.gen(function* (_) {
            const instruction = yield * _(parseInstruction)

            if (instruction !== undefined)
              yield * _(sourceService.matchPattern(/\n/))

            return instructions.concat(instruction)
          }),
        },
      ),
      Effect.map(instructions => instructions.filter(Boolean)),
    ),
  )

  return instructions
})

const parseInstruction = Effect.gen(function* (_) {
  const sourceService = yield * _(SourceService)

  const instructionsTypes = ['computed'] as const
  const instructionRegex = new RegExp(`- *((?:${instructionsTypes.join(')|(?:')}) +)`)

  const instructionOrError = yield * _(Effect.either(
    sourceService.matchPattern(instructionRegex, {
      ignoreWhitespace: true,
    })),
  )

  if (Either.isLeft(instructionOrError)) {
    const error = instructionOrError.left

    if (error instanceof TokenNotMatch)
      return undefined

    return yield * _(Effect.fail(error))
  }

  const instruction = instructionOrError.right

  const instructionType = instructionsTypes.find(type => instruction.includes(type))

  return yield * _(
    match(instructionType)
      .with('computed', () => parseComputedInstruction)
      .with(undefined, () => Effect.fail(new Error(`Unknown instruction type ${instructionType}`)))
      .exhaustive(),
  )
})

const parseComputedInstruction = Effect.gen(function* (_) {
  const sourceService = yield * _(SourceService)

  const name = yield * _(sourceService.matchPattern(/[\w-]+/))

  yield * _(sourceService.matchPattern(/ *= */))

  const computeValue = yield * _(parseExpression)

  return {
    $type: 'computed' as const,
    name,
    computeValue,
  }
})

const parseExpression = Effect.gen(function* (_) {
  const sourceService = yield * _(SourceService)

  yield * _(sourceService.matchPattern(/n *\* *2/))

  return {
    $type: 'expression' as const,
    expression: 'n * 2', // TODO
  }
})
