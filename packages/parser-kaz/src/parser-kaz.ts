import * as fs from 'node:fs'
import * as path from 'node:path'

import { parse, tokenize } from '@whitebird/kaz-ast'
import { ParserBase } from '@whitebird/kazam-parser-base'
import { glob } from 'glob'

import { transformAst } from './transform-ast'

const _ParserKaz = ParserBase<
  {
    pathRelativeToInputPath: string
    inputPath: string
  }[],
  { extension: '.kaz' }
>

export class ParserKaz extends _ParserKaz {
  public metadata = { extension: '.kaz' as const }

  async load({ input, rootDir }: Parameters<InstanceType<typeof _ParserKaz>['load']>[0]) {
    const normalizedInput = input.map(input => path.normalize(
      path.isAbsolute(input)
        ? input
        : path.join(rootDir, input),
    ))

    const kazFiles = normalizedInput.map(input => (
      input.endsWith('.kaz')
        ? [input]
        : glob.sync(path.join(input, '**/*.kaz'), { absolute: true })
    )
      .map(kazFile => ({
        pathRelativeToInputPath: path.relative(input.endsWith('.kaz') ? path.dirname(input) : input, kazFile),
        inputPath: input.endsWith('.kaz') ? path.dirname(input) : input,
      })),
    )

    return kazFiles.flat()
  }

  async parse(
    kazFiles: {
      pathRelativeToInputPath: string
      inputPath: string
    }[],
  ) {
    const kazAsts: Awaited<ReturnType<InstanceType<typeof _ParserKaz>['parse']>> = {}

    for (const { inputPath, pathRelativeToInputPath } of kazFiles) {
      const filePath = path.join(inputPath, pathRelativeToInputPath)

      const fileContent = fs.readFileSync(filePath, 'utf-8')

      const tokens = tokenize(fileContent)
      const ast = parse(tokens)

      if (ast instanceof Error)
        throw ast

      if (ast === undefined)
        throw new Error(`Could not parse file ${filePath}`)

      transformAst(ast, { fileName: filePath })

      kazAsts[pathRelativeToInputPath] = {
        ast,
        sourceAbsoluteFilePath: filePath,
      }
    }

    return kazAsts
  }
}
