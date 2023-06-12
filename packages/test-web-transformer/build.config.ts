/// <reference types="@types/node" />

import * as path from 'node:path'

import { TransformerReact } from '@whitebird/kazam-transformer-react'
import { defineBuildConfig } from 'unbuild'

import { renderTransformerReactOutputToHtml } from './src/utils/render-transformer-react-output-to-html'
import { runTests } from './src/utils/run-tests'

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
