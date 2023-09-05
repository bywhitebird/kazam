import { describe, expect, test } from 'vitest'

import * as fixtures from './fixtures/parse'
import { checkAST } from './helpers/customExpects'
import { parse } from '../src'

describe('parse', () => {
  describe('instructions', () => {
    Object.values(fixtures).flat().forEach((fixture) => {
      test(fixture.name, async () => {
        const parseResult = parse(fixture.input)

        if ('expectError' in fixture) {
          expect(parseResult).toBeInstanceOf(Error)
          return
        }

        expect(parseResult).not.toBeInstanceOf(Error)
        checkAST(parseResult, fixture.expectedTree)
      })
    })
  })
})
