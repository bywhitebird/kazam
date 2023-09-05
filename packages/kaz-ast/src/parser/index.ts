import { Effect, Layer, Ref, pipe } from 'effect'
import { SourceService, SourceServiceLive } from './services/source-service'
import { SourceStateServiceLive } from './services/source-state-service'

export const parse = (parameters: {
  source: string;
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
  )
)

const initSource = (source: string) => Effect.gen(function* (_) {
  const sourceService = yield* _(SourceService)

  sourceService.initSource(source)
})

const parseRoot = Effect.gen(function* (_) {
  const sourceService = yield* _(SourceService)

  const match = yield* _(sourceService.matchPattern(/Hello/))

  yield* _(Effect.log(match ?? 'No match'))

  const match2 = yield* _(sourceService.matchPattern(/.*/))

  yield* _(Effect.log(match2 ?? 'No match'))

  return {}
})

Effect.runSync(parse({
  source: 'Hello caca!',
}))
