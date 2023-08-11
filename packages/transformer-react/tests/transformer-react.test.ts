import { type TestWebTransformerMatchers, matchers } from '@whitebird/kazam-test-web-transformer/jest'
import { describe, expect, test } from 'vitest'

import { renderTransformerReactOutputToHtml } from './helpers/render-transformer-react-output-to-html'
import { TransformerReact } from '../src'

describe('transformer-react', () => {
  test('transformer-react should satisfy test-web-transformer', async () => {
    await expect(TransformerReact).toSatisfyWebScenarios({
      renderHtml: renderTransformerReactOutputToHtml,
    })
  }, {
    timeout: 30000,
  })
})

expect.extend(matchers)

declare module 'vitest' {
  interface Assertion<T> extends TestWebTransformerMatchers<T> { }
  interface AsymmetricMatchersContaining extends TestWebTransformerMatchers { }
}
