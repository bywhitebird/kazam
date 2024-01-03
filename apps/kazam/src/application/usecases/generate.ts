import type * as fs from 'node:fs'
import * as path from 'node:path'

import type { TransformerOutput } from '@whitebird/kazam-transformer-base'
import kebabCase from 'just-kebab-case'

import { generateEvents } from '../../core/events/generate'
import type { KazamConfig } from '../../types/kazam-config'
import type { Transformer } from '../../types/transformer'

export interface KazamFS {
  promises: Pick<typeof fs.promises, 'mkdir' | 'writeFile' | 'readFile' | 'readdir'>
}

const writeResults = async (
  files: Map<string, string>,
  fileSystem: KazamFS,
) => {
  for (const [filePath, fileContents] of files) {
    const directoryPath = filePath.split('/').slice(0, -1).join('/')

    await fileSystem.promises.mkdir(directoryPath, { recursive: true })
    await fileSystem.promises.writeFile(filePath, fileContents)

    generateEvents.emit('file-written', filePath)
  }
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
  rootDir: string,
) => {
  const sourceExtension = `.${sourceFilePath.split('.').slice(-1)[0]}` ?? ''
  const transformedExtension = `.${filePath.split('.').slice(-1)[0]}` ?? ''

  const transformerDirectory = getTransformerDirectory(transformer, config)

  const outputFilePath = path.resolve(
    rootDir,
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
  rootDir: string,
): Parameters<typeof writeResults>[0] => {
  const formattedTransformerResult = new Map<string, string>()

  transformerResult.forEach(({ filePath, content }, sourceFilePath) => {
    const outputFilePath = getTransformedOutputFilePath(filePath, sourceFilePath, transformer, config, rootDir)

    formattedTransformerResult.set(outputFilePath, content)
  })

  return formattedTransformerResult
}

const generateForConfig = async (
  config: Exclude<KazamConfig, unknown[]>,
  rootDir: string,
  fileSystem: KazamFS,
) => {
  return Promise.all(
    config.parsers.map(async (ParserClass) => {
      const parser = new ParserClass()

      const parserOutput = await parser.loadAndParse({
        ...config,
        rootDir,
        fs: fileSystem,
      })

      return await Promise.all(config.transformers.map(async (TransformerClass) => {
        const transformerInput = Object.fromEntries(
          Object.entries(parserOutput).map(([key, value]) => {
            return [key, {
              ...value,
              getTransformedOutputFilePath: (filePath: string) =>
                getTransformedOutputFilePath(filePath, value.sourceAbsoluteFilePath, TransformerClass, config, rootDir),
            }] as const
          }),
        )

        const transformer = new TransformerClass(transformerInput, {})

        const transformerResult = transformer.transform()

        if (fileSystem) {
          await writeResults(
            formatResults(transformerResult, TransformerClass, config, rootDir),
            fileSystem,
          )
        }

        return transformerResult
      }))
    }),
  )
    .then(results => results.flat())
}

export const generate = async (
  config: KazamConfig,
  rootDir: string,
  fileSystem: KazamFS,
) => {
  generateEvents.emit('pending', undefined)

  if (!Array.isArray(config))
    config = [config]

  const results = await Promise.all(
    config.map(config => generateForConfig(config, rootDir, fileSystem)),
  )
    .then(results => results.flat())
    .then((results) => {
      generateEvents.emit('success', undefined)
      return results
    })
    .catch((error) => {
      generateEvents.emit('error', error)
      throw error
    })

  return results
}
