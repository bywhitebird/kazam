import { describe } from 'vitest'

import { propInstructionsFixtures } from '../fixtures/parse'
import { testParse } from '../helpers/test-parse'

describe('parse prop instruction', () => {
  Object.values(propInstructionsFixtures).flat().forEach((fixture) => {
    testParse(fixture)
  })
})
