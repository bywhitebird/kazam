import * as fs from 'node:fs'
import * as path from 'node:path'

import { parse, tokenize } from '@whitebird/kaz-ast'
import { ParserBase } from '@whitebird/kazam-parser-base'
import { glob } from 'glob'

import { fixAstImportPaths } from './utils/fix-ast'

export class ParserKaz extends ParserBase<{
  pathRelativeToInputPath: string
  inputPath: string
}[]> {
  async load({ input, configPath }: Parameters<ParserBase<{
    pathRelativeToInputPath: string
    inputPath: string
  }[]>['load']>[0]) {
    const normalizedInput = input.map(input => path.normalize(
      path.isAbsolute(input)
        ? input
        : path.join(path.dirname(configPath), input),
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
    { input, output }: Parameters<ParserBase<{
      pathRelativeToInputPath: string
      inputPath: string
    }[]>['parse']>[1],
  ) {
    const kazAsts: Awaited<ReturnType<ParserBase<{
      pathRelativeToInputPath: string
      inputPath: string
    }[]>['parse']>> = {}

    for (const { inputPath, pathRelativeToInputPath } of kazFiles) {
      const filePath = path.join(inputPath, pathRelativeToInputPath)

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

      kazAsts[pathRelativeToInputPath] = {
        ast: fixedAst,
        sourceAbsoluteFilePath: filePath,
      }
    }

    return kazAsts
  }
}
