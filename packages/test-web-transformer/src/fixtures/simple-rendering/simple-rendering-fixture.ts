import dedent from 'dedent'

import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'

export const simpleRenderingFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: dedent`
      Hello World
    `
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'simple-rendering.png' })
  },
})
