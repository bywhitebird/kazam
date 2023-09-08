import { describe } from 'vitest'

import { tagFixtures } from '../fixtures/parse'
import { testParse } from '../helpers/test-parse'

describe('parse tag', () => {
  Object.values(tagFixtures).flat().forEach((fixture) => {
    testParse(fixture)
  })
})
