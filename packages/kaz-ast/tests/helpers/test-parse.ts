import { expect, test } from 'vitest'

import { checkAST } from './customExpects'
import { parse } from '../../src'
import type { Fixture } from '../types/fixture'

export function testParse(fixture: Fixture) {
  test(fixture.name, async () => {
    if ('expectError' in fixture)
      expect(() => parse(fixture.input)).toThrowError()
    else
      checkAST(parse(fixture.input), fixture.expectedTree)
  })
}
