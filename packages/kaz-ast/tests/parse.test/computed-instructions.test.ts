import { describe } from 'vitest'

import { computedInstructionsFixtures } from '../fixtures/parse'
import { testParse } from '../helpers/test-parse'

describe('parse computed instructions', () => {
  Object.values(computedInstructionsFixtures).flat().forEach((fixture) => {
    testParse(fixture)
  })
})
