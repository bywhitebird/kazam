import { describe, expect, test } from 'vitest'

import * as fixtures from './fixtures/tokenize'
import { tokenize } from '../src'

describe('tokenize', () => {
  describe('instructions', () => {
    Object.values(fixtures).flat().forEach((fixture) => {
      test(fixture.name, async () => {
        const result = await tokenize(fixture.input)

        expect(result).toHaveLength(fixture.expectedTokenCheckers.length)

        fixture.expectedTokenCheckers.forEach((checker, index) => {
          expect(result[index].$name).toBe(checker.checker.$name)

          const expectedRawValue = checker.rawValue
          if (expectedRawValue)
            expect(result[index].$rawValue).toBe(expectedRawValue)

          let expectedValue = checker.value

          if (typeof expectedValue === 'string')
            expectedValue = expectedValue.trim()

          if (expectedValue) {
            const value = result[index].$value

            if (typeof value === 'string')
              expect(value.trim()).toBe(expectedValue)
            else
              expect(result[index].$value).toBe(expectedValue)
          }
        })
      })
    })
  })
})
