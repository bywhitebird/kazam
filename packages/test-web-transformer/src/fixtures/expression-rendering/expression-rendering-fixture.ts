import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'
import dedent from 'dedent'

export const expressionRenderingFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: dedent`
      span() {
        ${'${1 + 1}'}
      }
    `
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'expression-rendering.png' })
  },
})
