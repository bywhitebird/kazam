import path from 'node:path'

import { Effect, pipe } from 'effect'

import { TransformService } from '../transform-service'

export const autoImport = (tagName: string) =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    const metadata = yield * _(transformService.getMetadata())

    const componentPath = yield * _(
      pipe(
        Object.keys(metadata.input),
        Effect.forEach(filePath =>
          Effect.all([transformService.getComponentName(filePath), Effect.succeed(filePath)])),
        Effect.map(componentInfos => componentInfos.find(([componentName]) => componentName === tagName)),
        Effect.map(componentInfo => componentInfo?.[1]),
      ),
    )

    if (componentPath === undefined)
      return

    yield * _(transformService.addImport('namedImport', {
      name: tagName,
      path: `./${path.relative(
        path.dirname(metadata.filePath),
        path.resolve(
          path.dirname(metadata.filePath),
          `${componentPath}.tsx`,
        ),
      )}`,
    }))
  })
