import dedent from 'dedent'

import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'

export const expressionRenderingFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: dedent`
      span() {
        ${
          /* eslint-disable-next-line no-template-curly-in-string */
          '${1 + 1}'
        }
      }
    `,
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'expression-rendering.png' })
  },
})
