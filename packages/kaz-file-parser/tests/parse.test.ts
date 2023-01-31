import { describe, expect, test } from 'vitest'

import { parse, tokenize } from '../src'
import { importInstructionsFixtures } from './fixtures/parse/import-instructions'
import { expectDeepContains } from './helpers/customExpects'

describe('parse', () => {
  describe('import instructions', () => {
    importInstructionsFixtures.forEach((fixture) => {
      test(fixture.name, async () => {
        const tokens = await tokenize(fixture.input)

        const parseResult = parse(tokens)

        if ('expectError' in fixture) {
          expect(parseResult).toBeInstanceOf(Error)
          return
        }

        expect(parseResult).not.toBeInstanceOf(Error)
        expectDeepContains(parseResult, fixture.expectedTree)
      })
    })
  })
})
