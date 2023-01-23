import { describe, expect, test } from 'vitest'

import { tokenize } from '../src'
import { importInstructionsFixtures } from './fixtures/tokenize/import-instructions'

describe('tokenize', () => {
  describe('import instructions', () => {
    importInstructionsFixtures.forEach((fixture) => {
      test(fixture.name, async () => {
        const result = await tokenize(fixture.input)

        expect(result).toHaveLength(fixture.expectedTokenCheckers.length)
        fixture.expectedTokenCheckers.forEach((checker, index) => {
          expect(result[index]).satisfy(checker.checker)
          const expectedValue = checker.value
          if (expectedValue)
            expect(result[index].$rawValue).toBe(expectedValue)
        })
      })
    })
  })
})
