import * as path from 'node:path'

import { ParserKaz } from '@whitebird/kazam-parser-kaz'
import { TransformerReact } from '@whitebird/kazam-transformer-react'
import { loadConfig } from 'c12'
import * as kazam from 'kazam'
import type { Plugin } from 'vite'

export const viteKazReactPlugin = (): Plugin => {
  let kazamGenerationResult: Awaited<ReturnType<typeof kazam.generate>>[0] | undefined
  // eslint-disable-next-line @typescript-eslint/ban-types
  let viteConfig: Parameters<Extract<Plugin['configResolved'], Function>>[0] | undefined
  let kazConfig: Parameters<typeof kazam['defineConfig']>[0] | undefined

  return {
    name: 'vite-kaz-react',

    enforce: 'pre',

    async configResolved(config) {
      viteConfig = config

      await loadConfig<Parameters<typeof kazam['defineConfig']>[0]>({
        name: 'kazam',
        cwd: config.root,
      }).then(({ config }) => {
        if (config === null)
          throw new Error('Could not load kazam config')

        kazConfig = config
      })
    },

    resolveId(source, importer) {
      if (source.endsWith('.kaz')) {
        const componentPath = path.join(path.dirname(importer ?? ''), source)
        return `${componentPath}.tsx`
      }

      if (source.endsWith('.kaz.tsx')) {
        const componentPath = path.join(path.dirname(importer ?? ''), source)
        return componentPath
      }

      return null
    },

    async load(id) {
      // As we provide only one config, kazam.generate will return only one output
      if (id.endsWith('.kaz.tsx')) {
        if (viteConfig === undefined)
          throw new Error('rootDir is undefined')

        if (kazConfig === undefined)
          throw new Error('kazConfig is undefined')

        kazamGenerationResult ??= await kazam.generate({
          rootDir: viteConfig.root,
          input: Array.isArray(kazConfig)
            ? kazConfig.map(({ input }) => input).flat()
            : kazConfig.input,
          output: `${viteConfig.root}/dist`,
          parsers: [ParserKaz],
          transformers: [TransformerReact],
        }).then(([output]) => output)

        if (kazamGenerationResult === undefined)
          throw new Error('kazamGenerationResult is undefined')

        const kazComponentId = id.slice(0, -'.tsx'.length)
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
