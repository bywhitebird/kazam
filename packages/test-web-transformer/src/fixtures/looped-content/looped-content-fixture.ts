import dedent from 'dedent'

import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'

export const loopedContentFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: dedent`
      @for(let i = 0; i < 10; i++) {
        ${
          /* eslint-disable-next-line no-template-curly-in-string */
          '${i}'
        }
      }
    `,
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'looped-content.png' })
  },
})
