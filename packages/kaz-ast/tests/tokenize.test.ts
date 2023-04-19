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

          const expectedValue = checker.value
          if (expectedValue)
            expect(result[index].$value).toBe(expectedValue)
        })
      })
    })
  })
})
