import { describe, test } from 'vitest'

import * as transformFixtures from './fixtures/transformer-react/transform'
import { expectToEqualIgnoreWhitespace } from './helpers/customExpects'
import { TransformerReact } from '../src'

describe('transformer-react', () => {
  describe('transform', () => {
    Object.values(transformFixtures).forEach((fixtures) => {
      fixtures.forEach((fixture) => {
        test(fixture.name, async () => {
          const transformer = new TransformerReact(fixture.input, {})

          const result = await transformer.transform()

          if (fixture.expectedOutput) {
            for (const [name, output] of Object.entries(result))
              expectToEqualIgnoreWhitespace(await (output as Blob).text(), fixture.expectedOutput[`components/${name}.tsx`])
          }
        })
      })
    })
  })
})
