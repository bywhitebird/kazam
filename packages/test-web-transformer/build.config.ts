/// <reference types="@types/node" />

import * as path from 'node:path'

import { defineBuildConfig } from 'unbuild'

import { runTests } from './src/utils/run-tests'
import { TransformerReact } from '../transformer-react'
import { renderTransformerReactOutputToHtml } from '../transformer-react/tests/helpers/render-transformer-react-output-to-html'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
    },
  ],
  declaration: true,
  externals: ['zod'],
  hooks: {
    'build:before': async () => {
      await updateFixtureScreenshots()
    },
  },
})

function updateFixtureScreenshots() {
  return runTests(
    TransformerReact,
    renderTransformerReactOutputToHtml,
    (takeScreenshot, fixture) => {
      return async (options) => {
        if (options?.path === undefined)
          throw new Error('path option is required when using page.screenshot')

        options.path = path.isAbsolute(options.path)
          ? options.path
          : path.join(fixture.fixtureDirectory, 'screenshots', options.path)

        const screenshot = await takeScreenshot(options)

        return screenshot
      }
    },
  )
}
