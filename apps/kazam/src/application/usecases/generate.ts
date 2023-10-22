import type * as fs from 'node:fs'

import type { TransformerOutput } from '@whitebird/kazam-transformer-base'
import kebabCase from 'just-kebab-case'

import { generateEvents } from '../../core/events/generate'
import type { KazamConfig } from '../../types/kazam-config'
import type { Transformer } from '../../types/transformer'

const writeResults = (
  files: Map<string, string>,
  fileSystem: typeof fs,
) => {
  files.forEach((fileContents, filePath) => {
    const directoryPath = filePath.split('/').slice(0, -1).join('/')

    fileSystem.mkdirSync(directoryPath, { recursive: true })
    fileSystem.writeFileSync(filePath, fileContents)

    generateEvents.emit('file-written', filePath)
  })
}

const formatResults = (
  transformerResult: TransformerOutput<{ outputFileNameFormat: string }>,
  transformer: Transformer,
  config: Exclude<KazamConfig, unknown[]>,
): Parameters<typeof writeResults>[0] => {
  const formattedTransformerResult = new Map<string, string>()

  const transformerDirectory = [
    config.output,
    kebabCase(transformer.name.replace(/^Transformer/, '')),
  ].join('/')

  transformerResult.forEach(({ filePath, content }, sourceFilePath) => {
    const sourceExtension = `.${sourceFilePath.split('.').slice(-1)[0]}` ?? ''
    const transformedExtension = `.${filePath.split('.').slice(-1)[0]}` ?? ''

    const outputFilePath = [
      transformerDirectory,
      // The following line replaces `.kaz.tsx` with `.tsx` (for example)
      filePath.replace(
        new RegExp(`${sourceExtension.replace('.', '\\.')}${transformedExtension.replace('.', '\\.')}$`),
        transformedExtension,
      ),
    ].join('/')

    formattedTransformerResult.set(outputFilePath, content)
  })

  return formattedTransformerResult
}

const generateForConfig = async (
  config: Exclude<KazamConfig, unknown[]>,
  configPath: string,
  fileSystem?: typeof fs | undefined,
) => {
  return Promise.all(
    config.parsers.map(async (ParserClass) => {
      const parser = new ParserClass()

      const transformerInput = await parser.loadAndParse({
        ...config,
        configPath,
      })

      return config.transformers.map((TransformerClass) => {
        const transformer = new TransformerClass(transformerInput, {})

        const transformerResult = transformer.transform()

        if (fileSystem) {
          writeResults(
            formatResults(transformerResult, TransformerClass, config),
            fileSystem,
          )
        }

        return transformerResult
      })
    }),
  )
    .then(results => results.flat())
}

export const generate = async (
  config: KazamConfig,
  configPath: string,
  fileSystem?: typeof fs | undefined,
) => {
  if (!Array.isArray(config))
    config = [config]

  const results = await Promise.all(
    config.map(config => generateForConfig(config, configPath, fileSystem)),
  )
    .then(results => results.flat())

  return results
}
