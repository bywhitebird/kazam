import { describe } from 'vitest'

import { stateInstructionsFixtures } from '../fixtures/parse'
import { testParse } from '../helpers/test-parse'

describe('parse state instruction', () => {
  Object.values(stateInstructionsFixtures).flat().forEach((fixture) => {
    testParse(fixture)
  })
})
