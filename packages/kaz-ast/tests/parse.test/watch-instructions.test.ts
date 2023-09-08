import { describe } from 'vitest'

import { watchInstructionsFixtures } from '../fixtures/parse'
import { testParse } from '../helpers/test-parse'

describe('parse watch instructions', () => {
  Object.values(watchInstructionsFixtures).flat().forEach((fixture) => {
    testParse(fixture)
  })
})
