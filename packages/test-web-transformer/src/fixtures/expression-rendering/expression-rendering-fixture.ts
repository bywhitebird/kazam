/* eslint-disable no-template-curly-in-string */ // NOTE: Need to disable this to use `${}` with dedent
import dedent from 'dedent'

import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'

export const expressionRenderingFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: dedent`
      span() {
        ${
          '${1 + 1}'
        }
      }
    `,
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'expression-rendering.png' })
  },
})
