import * as fs from 'node:fs'
import * as path from 'node:path'

import { parse, tokenize } from '@whitebird/kaz-ast'
import { ParserBase } from '@whitebird/kazam-parser-base'
import type { TransformerInput } from '@whitebird/kazam-transformer-base'
import { glob } from 'glob'

import { fixAstImportPaths } from './utils/fix-ast'

export class ParserKaz extends ParserBase<string[]> {
  async load({ input, configPath }: Parameters<ParserBase<string[]>['load']>[0]) {
    const normalizedInput = input.map(input => path.normalize(
      path.isAbsolute(input)
        ? input
        : path.join(path.dirname(configPath), input),
    ))

    const kazFiles = await Promise.all(normalizedInput.map(input =>
      input.endsWith('.kaz')
        ? [input]
        : glob(path.join(input, '**/*.kaz'), { absolute: true }),
    ))

    return kazFiles.flat()
  }

  async parse(
    kazFiles: string[],
    { input, output, configPath }: Parameters<ParserBase<string[]>['parse']>[1],
  ) {
    const kazAsts: TransformerInput = {}

    for (const filePath of kazFiles) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      const tokens = tokenize(fileContent)
      const ast = parse(tokens)

      if (ast instanceof Error)
        throw ast

      if (ast === undefined)
        throw new Error(`Could not parse file ${filePath}`)

      const fixedAst = fixAstImportPaths(
        ast,
        { filePath, input, output },
      )

      kazAsts[path.relative(configPath, filePath)] = fixedAst
    }

    return kazAsts
  }
}
