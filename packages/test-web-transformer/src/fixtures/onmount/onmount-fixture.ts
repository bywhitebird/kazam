/* eslint-disable no-template-curly-in-string */ // NOTE: Need to disable this to use `${}` with dedent
import dedent from 'dedent'

import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'

export const onmountFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: dedent`
      - state mounted: boolean = false
      - onMount () => {
        setTimeout(() => {
          mounted = true
        }, 1000)
      }

      div() {
        ${'${mounted ? "mounted" : "not mounted"}'}
      }
    `,
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'onmount-before.png' })
    await page.waitForTimeout(1000)
    await page.screenshot({ path: 'onmount-after-1-second.png' })
  },
})
