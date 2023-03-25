import { describe, expect, test } from 'vitest'

import { parse, tokenize } from '../src'
import { kazAstSchema } from '../src/types/KazAst'
import * as fixtures from './fixtures/parse'
import { expectDeepContains } from './helpers/customExpects'

describe('parse', () => {
  describe('instructions', () => {
    Object.values(fixtures).flat().forEach((fixture) => {
      test(fixture.name, async () => {
        const tokens = await tokenize(fixture.input)

        const parseResult = parse(tokens)

        if ('expectError' in fixture) {
          expect(parseResult).toBeInstanceOf(Error)
          return
        }

        expect(parseResult).not.toBeInstanceOf(Error)
        expectDeepContains(parseResult, fixture.expectedTree)

        expect(kazAstSchema.safeParse(parseResult)).toEqual({
          success: true,
          data: parseResult,
        })
      })
    })
  })
})
