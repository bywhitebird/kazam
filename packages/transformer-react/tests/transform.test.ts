import { describe, expect, test } from 'vitest'

import { TransformerReact } from '../src'
import { contentSpecFixtures } from './fixtures/transformer-react/transform/content'
import { propsSpecFixtures } from './fixtures/transformer-react/transform/props'
import { statementsSpecFixtures } from './fixtures/transformer-react/transform/statements'
import { expectToEqualIgnoreWhitespace } from './helpers/customExpects'

describe('transformer-react', () => {
  describe('transform', () => {
    describe('content', () => {
      contentSpecFixtures.forEach((fixture) => {
        test(fixture.name, async () => {
          const transformer = new TransformerReact(fixture.input, {})

          const result = await transformer.transform()

          if (fixture.expectedOutput) {
            for (const [name, output] of Object.entries(result))
              expectToEqualIgnoreWhitespace(await (output as Blob).text(), fixture.expectedOutput[name])
          }
        })
      })
    })

    describe('props', () => {
      propsSpecFixtures.forEach((fixture) => {
        test(fixture.name, async () => {
          const transformer = new TransformerReact(fixture.input, {})

          if (fixture.expectedError) {
            expect(() => transformer.transform()).rejects.toThrowError(fixture.expectedError)
            return
          }

          const result = await transformer.transform()

          if (fixture.expectedOutput) {
            for (const [name, output] of Object.entries(result))
              expectToEqualIgnoreWhitespace(await (output as Blob).text(), fixture.expectedOutput[name])
          }
        })
      })
    })
  })

  describe('statements', () => {
    statementsSpecFixtures.forEach((fixture) => {
      test(fixture.name, async () => {
        const transformer = new TransformerReact(fixture.input, {})

        const result = await transformer.transform()

        if (fixture.expectedOutput) {
          for (const [name, output] of Object.entries(result))
            expectToEqualIgnoreWhitespace(await (output as Blob).text(), fixture.expectedOutput[name])
        }
      })
    })
  })
})
