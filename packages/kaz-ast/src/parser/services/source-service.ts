import { Effect, Context, Layer, Ref } from "effect"
import { SourceStateService } from "./source-state-service"
import { TokenNotMatch } from "../errors/token-not-match"
 
export interface SourceService {
  readonly initSource: (source: string) => Effect.Effect<never, never, void>
  readonly matchPattern: (pattern: RegExp) => Effect.Effect<never, TokenNotMatch, string | undefined>
}
 
export const SourceService = Context.Tag<SourceService>()
 
export const SourceServiceLive = Layer.effect(
  SourceService,
  Effect.map(SourceStateService, (sourceState) =>
    SourceService.of({
      initSource: (source) => Effect.gen(function* (_) {
        yield* _(Ref.set(sourceState, source))
      }),
      matchPattern: (pattern) => Effect.gen(function* (_) {
        const source = yield* _(Ref.get(sourceState))

        const match = source.match(pattern)

        if (match === null) {
          yield* _(Effect.fail(new TokenNotMatch(`Pattern ${pattern} not match`)))
          return
        }

        const [value] = match

        yield* _(Ref.update(sourceState, (state) => {
          return state.slice(value.length)
        }))

        return value
      })
    })
  )
)
