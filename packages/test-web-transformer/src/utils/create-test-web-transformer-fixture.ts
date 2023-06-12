import type { ITransformerInput } from '@whitebird/kazam-transformer-base'
import type { Page } from 'playwright'

export interface TestWebTransformerFixture {
  fixtureDirectory: string
  input: ITransformerInput & { 'Index': ITransformerInput['Index'] }
  scenario: (page: Page) => Promise<void>
}

export const createTestWebTransformerFixture = (fixture: TestWebTransformerFixture) => {
  return fixture
}
