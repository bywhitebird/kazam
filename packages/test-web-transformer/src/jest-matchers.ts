import type { RenderHtml, Transformer } from './types'

import { testWebTransformer } from '.'

export const matchers = {
  async toSatisfyWebScenarios(
    TransformerConstructor: Transformer,
    { renderHtml }: { renderHtml: RenderHtml },
  ) {
    const testResult = await testWebTransformer(TransformerConstructor, renderHtml)

    return {
      pass: testResult === true,
      message: () => {
        if (testResult === true)
          return `${TransformerConstructor.name} satisfied test-web-transformer`

        return testResult
      },
    }
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Matcher<F extends (arg1: any, arg2: any) => any> = F extends (...args: any) => Promise<any>
  ? (args: Parameters<F>[1]) => Promise<void>
  : (args: Parameters<F>[1]) => void

export type TestWebTransformerMatchers<R = unknown> = {
  [K in keyof typeof matchers]: R extends Parameters<typeof matchers[K]>[0]
    ? Matcher<typeof matchers[K]>
    : never
}
