import playwright from 'playwright'

import { DiffError } from './diff-error'
import * as fixtures from '../fixtures'
import type { Fixture, OverridePageScreenshot, RenderHtml, Transformer } from '../types'

const runTest = async (
  fixturePromise: Fixture,
  newTransformer: Transformer,
  renderHtml: RenderHtml,
  browser: playwright.Browser,
  overridePageScreenshot: OverridePageScreenshot,
): Promise<true | string> => {
  const fixture = await fixturePromise

  // eslint-disable-next-line new-cap
  const transformer = new newTransformer(fixture.input, {})
  const output = await transformer.transform()
  const html = await renderHtml(output)

  const page = await browser.newPage()
  // override page.screenshot to compare the screenshot with the reference image
  const takeScreenshot = page.screenshot.bind(page)
  page.screenshot = overridePageScreenshot(takeScreenshot, fixture)

  const consoleLogs: string[] = []

  page.on('pageerror', (err) => {
    throw new Error([...consoleLogs, err.toString()].join('\n'))
  })

  page.on('console', (message) => {
    console.log('[CONSOLE]', message)
    consoleLogs.push(message.text())

    if (message.type() === 'error')
      // eslint-disable-next-line unicorn/error-message
      throw new Error(consoleLogs.join('\n'))
  })

  await page.setContent(html)

  try {
    await fixture.scenario(page)
    return true
  }
  catch (error) {
    if (error instanceof DiffError)
      return error.message
    else
      throw error
  }
  finally {
    await page.close()
  }
}

export const runTests = async (
  newTransformer: Transformer,
  renderHtml: RenderHtml,
  overridePageScreenshot: OverridePageScreenshot,
): Promise<true | string> => {
  const browser = await playwright.chromium.launch()

  for (const [, fixture] of Object.entries(fixtures)) {
    const testResult = await runTest(fixture, newTransformer, renderHtml, browser, overridePageScreenshot)

    if (testResult !== true)
      return testResult
  }

  await browser.close()

  return true
}
