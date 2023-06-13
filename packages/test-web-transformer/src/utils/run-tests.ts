import playwright from 'playwright'

import { DiffError } from './diff-error'
import * as fixtures from '../fixtures'
import type { Fixture, OverridePageScreenshot, RenderHtml, Transformer } from '../types'

const runTest = async (
  fixture: Fixture,
  newTransformer: Transformer,
  renderHtml: RenderHtml,
  browser: playwright.Browser,
  overridePageScreenshot: OverridePageScreenshot,
): Promise<true | string> => {
  // eslint-disable-next-line new-cap
  const transformer = new newTransformer(fixture.input, {})
  const output = await transformer.transform()
  const html = await renderHtml(output)

  const page = await browser.newPage()
  // override page.screenshot to compare the screenshot with the reference image
  const takeScreenshot = page.screenshot.bind(page)
  page.screenshot = overridePageScreenshot(takeScreenshot, fixture)

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

  return await Promise.all(
    Object.values(fixtures)
      .map(fixture => runTest(fixture, newTransformer, renderHtml, browser, overridePageScreenshot)),
  )
    .then((results) => {
      const failed = results.find(result => result !== true)

      return failed === undefined
        ? true
        : failed
    })
    .finally(() => browser.close())
}