import { Context, Effect, Layer, Ref } from 'effect'

import { SourceStateService } from './source-state-service'
import { TokenNotMatch } from '../errors/token-not-match'

export interface SourceService {
  readonly initSource: (source: string) => Effect.Effect<never, never, void>
  readonly matchPattern: (pattern: RegExp, options?: {
    ignoreWhitespace?: boolean
  }) => Effect.Effect<never, TokenNotMatch, string>
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SourceService = Context.Tag<SourceService>()

export const SourceServiceLive = Layer.effect(
  SourceService,
  Effect.map(SourceStateService, sourceState =>
    SourceService.of({
      initSource: source => Effect.gen(function* (_) {
        yield * _(Ref.set(sourceState, source))
      }),
      matchPattern: (_pattern, options) => Effect.gen(function* (_) {
        const source = yield * _(Ref.get(sourceState))

        const pattern = options?.ignoreWhitespace
          ? new RegExp(`^\\s*(${_pattern.source})\\s*`)
          : new RegExp(`^(${_pattern.source})`)

        const match = source.match(pattern)

        const rawValue = match?.[0] ?? null
        const value = match?.[1] ?? null

        if (rawValue === null || value === null) {
          yield * _(Effect.fail(new TokenNotMatch(`Pattern ${pattern} not match`)))
          return null as never
        }

        yield * _(Ref.update(sourceState, (state) => {
          return state.slice(rawValue.length)
        }))

        return value
      }),
    }),
  ),
)
