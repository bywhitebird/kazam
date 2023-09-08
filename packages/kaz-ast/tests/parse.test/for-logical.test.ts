import { describe } from 'vitest'

import { forLogicalFixtures } from '../fixtures/parse'
import { testParse } from '../helpers/test-parse'

describe('parse for logical', () => {
  Object.values(forLogicalFixtures).flat().forEach((fixture) => {
    testParse(fixture)
  })
})
