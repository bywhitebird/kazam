/* eslint-disable no-template-curly-in-string */ // NOTE: Need to disable this to use `${}` with dedent
import dedent from 'dedent'

import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'

export const watcherFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: dedent`
      - state count: number = 0
      - state color: string = 'red'
      - watch (count) => {
        if (count > 0) {
          color = 'green'
        }
      }

      div() {
        Count: span(style={${'`color: ${color}`'}}) {
          ${'${count}'}
        }
      }
      button(on:click={() => count++}) { Increment }
    `,
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'watcher-before-click.png' })
    await page.click('button')
    await page.screenshot({ path: 'watcher-after-1-click.png' })
  },
})
