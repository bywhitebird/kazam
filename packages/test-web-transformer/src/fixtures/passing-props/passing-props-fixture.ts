import dedent from 'dedent'

import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'

export const passingPropsFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: dedent`
      Component(text="Hello World") {}
    `,
    Component: dedent`
      - prop text: string

      span() {
        ${
          /* eslint-disable-next-line no-template-curly-in-string */
          '${text}'
        }
      }
    `,
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'passing-props.png' })
  },
})
