import { type TestWebTransformerMatchers, matchers } from '@whitebird/kazam-test-web-transformer/jest'
import { describe, expect, test } from 'vitest'

import { renderTransformerReactOutputToHtml } from './helpers/render-transformer-react-output-to-html'
import { TransformerReact } from '../src'

describe('transformer-react', () => {
  test('transformer-react should satisfy test-web-transformer', async () => {
    await expect(TransformerReact).toSatisfyWebScenarios({
      renderHtml: renderTransformerReactOutputToHtml,
    })
  })
})

expect.extend(matchers)

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Assertion<T = any> extends TestWebTransformerMatchers<T> { }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AsymmetricMatchersContaining extends TestWebTransformerMatchers { }
}
