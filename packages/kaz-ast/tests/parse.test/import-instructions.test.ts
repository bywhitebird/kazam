import { describe } from 'vitest'

import { importInstructionsFixtures } from '../fixtures/parse'
import { testParse } from '../helpers/test-parse'

describe('parse import instruction', () => {
  Object.values(importInstructionsFixtures).flat().forEach((fixture) => {
    testParse(fixture)
  })
})
