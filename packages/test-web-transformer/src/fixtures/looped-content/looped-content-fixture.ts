import { createTestWebTransformerFixture } from '../../utils/create-test-web-transformer-fixture'

export const loopedContentFixture = createTestWebTransformerFixture({
  fixtureDirectory: __dirname,
  input: {
    Index: {
      $type: 'Kaz',
      template: [
        {
          $type: 'ForLogical',
          parameters: 'let i = 0; i < 10; i++',
          children: [{ $type: 'Expression', expression: 'i' }],
        },
      ],
      instructions: [],
    },
  },
  scenario: async (page) => {
    await page.screenshot({ path: 'looped-content.png' })
  },
})
