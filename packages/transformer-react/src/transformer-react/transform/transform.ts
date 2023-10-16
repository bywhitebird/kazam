import { Effect, pipe } from 'effect'
import * as prettier from 'prettier'

import { createServices } from './create-services'
import { TransformService } from './transform-service/transform-service'
import type { TransformerReact } from '../transformer-react'

export const transform = ({ input }: Pick<TransformerReact, 'input' | 'options'>) => Effect.provide(
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    const output = new Map<string, { filePath: `${string}.tsx`; content: string }>()

    for (const filePath in input) {
      const file = input[filePath]

      if (file === undefined)
        continue

      yield * _(transformService.setMetadata({
        componentName: yield * _(transformService.getComponentName(filePath)),
        filePath,
        input,
      }))

      const transformed = yield * _(
        pipe(
          transformService.handle(file),
          Effect.map(transformed =>
            prettier.format(transformed, {
              parser: 'babel-ts',
              printWidth: Number.POSITIVE_INFINITY,
            }),
          ),
        ),
      )

      output.set(filePath, {
        filePath: `${filePath}.tsx`,
        content: transformed,
      })
    }

    return output
  }),
  createServices(),
)
