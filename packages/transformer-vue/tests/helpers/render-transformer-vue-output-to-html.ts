import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import vue from '@vitejs/plugin-vue'
import type { testWebTransformer } from '@whitebird/kazam-test-web-transformer'
import type { TransformerOutput } from '@whitebird/kazam-transformer-base'
import tmp from 'tmp'
import * as vite from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

type RenderHtml = Parameters<typeof testWebTransformer>[1]

export const renderTransformerVueOutputToHtml: RenderHtml = async (output) => {
  const tmpProjectDir = tmp.dirSync({
    tmpdir: process.cwd(),
    unsafeCleanup: true,
  })

  try {
    writeProjectFiles(tmpProjectDir.name, output)

    let indexHtml = await getBundledIndexHtml(tmpProjectDir.name)

    if (indexHtml instanceof Uint8Array)
      indexHtml = Buffer.from(indexHtml).toString()

    return indexHtml
  }
  // eslint-disable-next-line no-useless-catch
  catch (error) {
    throw error
  }
  finally {
    tmpProjectDir.removeCallback()
  }
}

function writeProjectFiles(
  projectDir: string,
  output: TransformerOutput,
) {
  for (const [, { filePath, content }] of output.entries()) {
    if (filePath === null)
      continue

    const realFilePath = path.join(projectDir, filePath)

    fs.mkdirSync(path.dirname(realFilePath), { recursive: true })
    fs.writeFileSync(realFilePath, content)
  }

  fs.writeFileSync(path.join(projectDir, 'index.html'), `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Vue App</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module">
          import Index from './Index.vue'
          import { createApp } from 'vue'
          createApp(Index).mount('#root')
        </script>
      </body>
    </html>
  `)
}

async function getBundledIndexHtml(
  projectDir: string,
) {
  const buildResult = await vite.build({
    root: projectDir,
    logLevel: 'silent',
    build: {
      write: false,
    },
    plugins: [
      vue(),
      viteSingleFile(),
    ],
  })
    .then((result) => {
      if (Array.isArray(result)) {
        if (result.length > 1)
          throw new Error('Expected single build result')

        return result[0]
      }

      if (!('output' in result))
        throw new Error('Expected build result to have output')

      return result
    })

  const indexHtml = buildResult.output.find(file => file.fileName === 'index.html')

  if (indexHtml === undefined)
    throw new Error('Expected index.html to be in build output')

  if (indexHtml.type !== 'asset')
    throw new Error('Expected index.html to be an asset')

  return indexHtml.source
}
