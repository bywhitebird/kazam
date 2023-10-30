import * as path from 'node:path'

import { ParserKaz } from '@whitebird/kazam-parser-kaz'
import { TransformerReact } from '@whitebird/kazam-transformer-react'
import * as kazam from 'kazam'
import type { Plugin } from 'vite'

export const viteKazReactPlugin = (): Plugin => {
  const KAZ_REACT_SUFFIX = '?kaz-react'

  const kazComponents: string[] = []
  let kazamGenerationResult: Awaited<ReturnType<typeof kazam.generate>>[0] | undefined
  let rootDir: string | undefined

  return {
    name: 'vite-kaz-react',

    enforce: 'pre',

    resolveId(source, importer) {
      if (importer?.endsWith('/index.html'))
        rootDir = importer.slice(0, -'index.html'.length)

      if (source.endsWith('.kaz')) {
        const componentPath = path.join(path.dirname(importer ?? ''), source)

        kazComponents.push(componentPath)
        return `${componentPath}.tsx${KAZ_REACT_SUFFIX}`
      }

      return null
    },

    async load(id) {
      // As we provide only one config, kazam.generate will return only one output
      if (id.endsWith(KAZ_REACT_SUFFIX)) {
        if (rootDir === undefined)
          throw new Error('rootDir is undefined')

        kazamGenerationResult ??= await kazam.generate({
          rootDir,
          input: kazComponents,
          output: `${rootDir}/dist`,
          parsers: [ParserKaz],
          transformers: [TransformerReact],
        }).then(([output]) => output)

        if (kazamGenerationResult === undefined)
          throw new Error('kazamGenerationResult is undefined')

        const kazComponentId = id.slice(0, -`.tsx${KAZ_REACT_SUFFIX}`.length)
        const kazComponentFilename = path.basename(kazComponentId)

        const output = kazamGenerationResult.get(kazComponentFilename)?.content

        if (output === undefined)
          throw new Error(`Could not find output for ${kazComponentId}`)

        return output
      }

      return null
    },

    handleHotUpdate({ file, server, modules }) {
      if (file.endsWith('.kaz')) {
        kazamGenerationResult = undefined

        return [
          ...(server.moduleGraph.getModulesByFile(`${file}.tsx`) ?? []),
          ...modules,
        ]
      }

      return modules
    },
  }
}
