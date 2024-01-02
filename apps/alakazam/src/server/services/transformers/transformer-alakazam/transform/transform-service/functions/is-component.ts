import { Effect, pipe } from 'effect'
import { TransformService } from '../transform-service'

export const isComponent = (tagName: string) =>
  Effect.gen(function* (_) {
    const transformService = yield* _(TransformService)

    const metadata = yield* _(transformService.getMetadata())

    const foundComponent = yield* _(
      pipe(
        Object.keys(metadata.input),
        Effect.forEach(filePath =>
          Effect.all([transformService.getComponentName(filePath), Effect.succeed(filePath)])),
        Effect.map(componentInfos => componentInfos.find(([componentName]) => componentName === tagName)),
        Effect.map(componentInfo => componentInfo?.[1]),
      ),
    )

    return foundComponent !== undefined
  })
