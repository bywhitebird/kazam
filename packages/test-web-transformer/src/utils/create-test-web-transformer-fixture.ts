import { parse, tokenize } from '@whitebird/kaz-ast'
import type { ITransformerInput } from '@whitebird/kazam-transformer-base'
import type { Page } from 'playwright'

export interface TestWebTransformerFixture {
  fixtureDirectory: string
  input: ITransformerInput & { 'Index': ITransformerInput['Index'] }
  scenario: (page: Page) => Promise<void>
}

interface TestWebTransformerFixtureInput {
  fixtureDirectory: string
  input: { 'Index': string; [key: string]: string }
  scenario: (page: Page) => Promise<void>
}

export const createTestWebTransformerFixture = async (fixture: TestWebTransformerFixtureInput): Promise<TestWebTransformerFixture> => {
  return {
    ...fixture,
    input: Object.fromEntries(
      Object.entries(fixture.input).map(([key, value]) => {
        const tokens = tokenize(value)
        const ast = parse(tokens)

        if (ast instanceof Error || ast === undefined)
          throw new Error(`Failed to parse ${key} in ${fixture.fixtureDirectory}`)

        return [key, ast] as const
      }),
    ) as TestWebTransformerFixture['input'],
  }
}
