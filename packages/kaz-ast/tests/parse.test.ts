import { describe, expect, test } from 'vitest'

import * as fixtures from './fixtures/parse'
import { checkAST } from './helpers/customExpects'
import { parse, tokenize } from '../src'
import { kazAstSchema } from '../src/types/KazAst'

describe('parse', () => {
  describe('instructions', () => {
    Object.values(fixtures).flat().forEach((fixture) => {
      test(fixture.name, () => {
        const tokens = tokenize(fixture.input)

        const parseResult = parse(tokens)

        if ('expectError' in fixture) {
          expect(parseResult).toBeInstanceOf(Error)
          return
        }

        expect(parseResult).not.toBeInstanceOf(Error)
        checkAST(parseResult, fixture.expectedTree)

        expect(kazAstSchema.safeParse(parseResult)).toEqual({
          success: true,
          data: parseResult,
        })
      })
    })
  })
})
