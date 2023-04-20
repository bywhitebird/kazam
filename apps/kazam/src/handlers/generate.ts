import * as fs from 'node:fs'
import path from 'node:path'

import type { KazAst } from '@whitebird/kaz-ast'

import type { KazamConfig } from '../utils/define-config.js'

export const generate = async (config: KazamConfig) => {
  await Promise.all(config.parsers.map(async (Parser) => {
    const parser = new Parser()

    const asts = await parser.parse(await parser.load(config), config)

    const transformedAsts = await transformAsts(asts, config.transformers)

    await writeOutput(transformedAsts, config)
  }))
}

async function transformAsts(asts: Record<string, KazAst>, transformers: KazamConfig['transformers']) {
  return Object.fromEntries(
    await Promise.all(
      transformers.map(async (Transformer) => {
        const transformerInstance = new Transformer(asts, {})
        const output = await transformerInstance.transform()

        return [Transformer.name, output] as const
      }),
    ),
  )
}

async function writeOutput(output: Awaited<ReturnType<typeof transformAsts>>, config: KazamConfig) {
  const outputPath = path.isAbsolute(config.output)
    ? config.output
    : path.join(process.cwd(), config.output)

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })

  await Promise.all(
    Object.entries(output).map(async ([transformerName, transformerOutput]) => {
      const transformerOutputPath = config.transformers.length > 1
        ? path.join(outputPath, normalizeTransformerName(transformerName))
        : outputPath

      await Promise.all(
        Object.entries(transformerOutput ?? {}).map(async ([fileName, file]) => {
          if (file === undefined)
            throw new Error(`Transformer ${transformerName} returned undefined for file ${fileName}`)

          if (!(file instanceof Blob))
            throw new Error(`Transformer ${transformerName} returned non-Blob for file ${fileName}`)

          const filePath = path.join(transformerOutputPath, file.name)

          await fs.promises.mkdir(path.dirname(filePath), { recursive: true })

          await fs.promises.writeFile(filePath, await file.text())
        }),
      )
    }),
  )
}

function normalizeTransformerName(name: string) {
  return name.replace(/^Transformer/, '').toLowerCase()
}
