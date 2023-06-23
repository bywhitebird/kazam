import dedent from 'dedent'

import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'

export const conditionalRenderingFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: dedent`
      - state count: number = 0

      div() {
        @if (count === 0) {
          Count is zero
        } @else {
          Count is not zero
        }
      }
      button(on:click={() => count++}) { Increment }
    `,
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'conditional-rendering-before-click.png' })
    await page.click('button')
    await page.screenshot({ path: 'conditional-rendering-after-1-click.png' })
  },
})
