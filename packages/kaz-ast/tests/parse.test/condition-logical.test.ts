import { describe } from 'vitest'

import { conditionLogicalFixtures } from '../fixtures/parse'
import { testParse } from '../helpers/test-parse'

describe('parse condition logical', () => {
  Object.values(conditionLogicalFixtures).flat().forEach((fixture) => {
    testParse(fixture)
  })
})
