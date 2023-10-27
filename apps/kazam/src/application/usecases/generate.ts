import type * as fs from 'node:fs'
import * as path from 'node:path'

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

const getTransformerDirectory = (transformer: Transformer, config: Exclude<KazamConfig, unknown[]>) => {
  const transformerDirectory = [
    config.output,
    kebabCase(transformer.name.replace(/^Transformer/, '')),
  ].join('/')

  return transformerDirectory
}

const getTransformedOutputFilePath = (
  filePath: string,
  sourceFilePath: string,
  transformer: Transformer,
  config: Exclude<KazamConfig, unknown[]>,
  configPath: string,
) => {
  const sourceExtension = `.${sourceFilePath.split('.').slice(-1)[0]}` ?? ''
  const transformedExtension = `.${filePath.split('.').slice(-1)[0]}` ?? ''

  const transformerDirectory = getTransformerDirectory(transformer, config)

  const outputFilePath = path.resolve(
    path.dirname(configPath),
    transformerDirectory,
    filePath.replace(
      new RegExp(`${sourceExtension.replace('.', '\\.')}${transformedExtension.replace('.', '\\.')}$`),
      transformedExtension,
    ),
  )

  return outputFilePath
}

const formatResults = (
  transformerResult: TransformerOutput<{ outputFileNameFormat: string }>,
  transformer: Transformer,
  config: Exclude<KazamConfig, unknown[]>,
  configPath: string,
): Parameters<typeof writeResults>[0] => {
  const formattedTransformerResult = new Map<string, string>()

  transformerResult.forEach(({ filePath, content }, sourceFilePath) => {
    const outputFilePath = getTransformedOutputFilePath(filePath, sourceFilePath, transformer, config, configPath)

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

      const parserOutput = await parser.loadAndParse({
        ...config,
        configPath,
      })

      return config.transformers.map((TransformerClass) => {
        const transformerInput = Object.fromEntries(
          Object.entries(parserOutput).map(([key, value]) => {
            return [key, {
              ...value,
              getTransformedOutputFilePath: (filePath: string) =>
                getTransformedOutputFilePath(filePath, value.sourceAbsoluteFilePath, TransformerClass, config, configPath),
            }] as const
          }),
        )

        const transformer = new TransformerClass(transformerInput, {})

        const transformerResult = transformer.transform()

        if (fileSystem) {
          writeResults(
            formatResults(transformerResult, TransformerClass, config, configPath),
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
