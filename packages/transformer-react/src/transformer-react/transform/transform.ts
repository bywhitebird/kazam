import { replaceKazamMagicStrings } from '@whitebird/kazam-transform-utils'
import { Effect, pipe } from 'effect'
import lodash from 'lodash'
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
        sourceAbsoluteFilePath: file.sourceAbsoluteFilePath,
        outputAbsoluteFilePath: file.getTransformedOutputFilePath(`${filePath}.tsx`),
        input,
      }))

      const transformed = yield * _(
        pipe(
          transformService.handle(file.ast),
          Effect.map(transformed => replaceKazamMagicStrings(transformed, {
            getComputed(_match, computedName) {
              return computedName
            },
            getState(_match, stateName) {
              return stateName
            },
            setState(_match, stateName, setter) {
              return `set${lodash.upperFirst(stateName)}((${stateName}) => { ${setter}; return ${stateName} })`
            },
            getProp(_match, propName) {
              return propName
            },
          })),
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
