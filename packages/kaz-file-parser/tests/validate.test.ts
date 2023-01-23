import { describe, expect, test } from 'vitest'

import { tokenize, validate } from '../src'
import { importInstructionsFixtures } from './fixtures/validate/import-instructions'

describe('validate', () => {
  describe('import instructions', () => {
    importInstructionsFixtures.forEach((fixture) => {
      test(fixture.name, async () => {
        const tokens = await tokenize(fixture.input)

        const validationResult = validate(tokens)

        if (fixture.isValid)
          expect(validationResult).not.toBeInstanceOf(Error)
        else
          expect(validationResult).toBeInstanceOf(Error)
      })
    })
  })
})
