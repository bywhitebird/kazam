import * as fs from 'node:fs'
import * as path from 'node:path'

import lookSame from 'looks-same'

import type { RenderHtml, Transformer } from './types'
import { DiffError } from './utils/diff-error'
import { runTests } from './utils/run-tests'

export const testWebTransformer = (
  newTransformer: Transformer,
  renderHtml: RenderHtml,
) =>
  runTests(
    newTransformer,
    renderHtml,
    (takeScreenshot, fixture) => {
      return async (options) => {
        if (options?.path === undefined)
          throw new Error('path option is required when using page.screenshot')

        const referencePath = path.join(fixture.fixtureDirectory, 'screenshots', options.path)
        if (!fs.existsSync(referencePath))
          throw new Error(`Reference image does not exist: ${referencePath}`)

        const referenceScreenshot = await fs.promises.readFile(referencePath)

        // remove path from options to prevent playwright from saving the screenshot
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { path: _, ...optionsWithoutPath } = options
        const screenshot = await takeScreenshot(optionsWithoutPath)

        const { equal } = await lookSame(referenceScreenshot, screenshot)

        if (!equal)
          throw new DiffError(referencePath)

        return screenshot
      }
    },
  )
