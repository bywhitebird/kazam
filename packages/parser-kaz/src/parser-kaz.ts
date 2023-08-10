import * as fs from 'node:fs'
import * as path from 'node:path'
import process from 'node:process'

import { parse, tokenize } from '@whitebird/kaz-ast'
import { ParserBase } from '@whitebird/kazam-parser-base'
import { glob } from 'glob'

export class ParserKaz extends ParserBase {
  async load(config: { input: string[] }) {
    const normalizedInput = config.input.map(input => path.normalize(
      path.isAbsolute(input)
        ? input
        : path.join(process.cwd(), input),
    ))

    const kazFiles = await Promise.all(normalizedInput.map(input =>
      input.endsWith('.kaz')
        ? [input]
        : glob(path.join(input, '**/*.kaz'), { absolute: true }),
    ))

    return kazFiles.flat()
  }

  async parse(kazFiles: Awaited<ReturnType<this['load']>>, config: { input: string[] }) {
    return Object.fromEntries(
      await Promise.all(kazFiles.map(async filePath =>
        [
          path.relative(
            (config.input.length === 1 && config.input[0]) || process.cwd(),
            filePath,
          ),
          await (async () => {
            const fileContent = fs.readFileSync(filePath, 'utf-8')

            const tokens = await tokenize(fileContent)
            const ast = await parse(tokens)

            if (ast instanceof Error)
              throw ast

            if (ast === undefined)
              throw new Error(`Could not parse file ${filePath}`)

            return ast
          })(),
        ] as const,
      )),
    )
  }
}
