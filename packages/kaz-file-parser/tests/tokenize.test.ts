import { describe, expect, test } from 'vitest'

import { tokenize } from '../src'
import * as fixtures from './fixtures/tokenize'

describe('tokenize', () => {
  describe('instructions', () => {
    Object.values(fixtures).flat().forEach((fixture) => {
      test(fixture.name, async () => {
        const result = await tokenize(fixture.input)

        expect(result).toHaveLength(fixture.expectedTokenCheckers.length)

        fixture.expectedTokenCheckers.forEach((checker, index) => {
          expect(result[index]).satisfy(checker.checker)

          const expectedRawValue = checker.rawValue
          if (expectedRawValue)
            expect(result[index].$rawValue).toBe(expectedRawValue)

          const expectedValue = checker.value
          if (expectedValue)
            expect(result[index].$value).toBe(expectedValue)
        })
      })
    })
  })
})
