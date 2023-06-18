import dedent from 'dedent'

import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'

export const stateFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: dedent`
      - state count: number = 0

      div() {
        Count: ${'${count}'}
      }
      button(on:click={() => count++}) { Increment }
    `,
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'state-before-click.png' })
    await page.click('button')
    await page.screenshot({ path: 'state-after-1-click.png' })
  },
})
