/* eslint-disable no-template-curly-in-string */ // NOTE: Need to disable this to use `${}` with dedent
import dedent from 'dedent'

import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'

export const computedFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: dedent`
      - state count: number = 0
      - computed doubleCount = count * 2

      div() {
        Double count: ${'${doubleCount}'}
      }
      button(on:click={() => count++}) { Increment }
    `,
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'computed-before-click.png' })
    await page.click('button')
    await page.screenshot({ path: 'computed-after-1-click.png' })
  },
})
