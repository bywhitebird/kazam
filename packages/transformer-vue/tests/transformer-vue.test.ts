import { type TestWebTransformerMatchers, matchers } from '@whitebird/kazam-test-web-transformer/jest'
import { describe, expect, test } from 'vitest'

import { renderTransformerVueOutputToHtml } from './helpers/render-transformer-vue-output-to-html'
import { TransformerVue } from '../src'

describe('transformer-vue', () => {
  test('transformer-vue should satisfy test-web-transformer', async () => {
    await expect(TransformerVue).toSatisfyWebScenarios({
      renderHtml: renderTransformerVueOutputToHtml,
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
