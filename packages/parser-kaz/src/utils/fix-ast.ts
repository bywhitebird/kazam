import path from 'node:path'

import type { KazAst } from '@whitebird/kaz-ast'
import type { ParserBase } from '@whitebird/kazam-parser-base'

export function fixAstImportPaths(ast: KazAst, filePath: string, config: Parameters<ParserBase['load']>[0]) {
  for (const instruction of ast.instructions) {
    if (instruction.$type !== 'ImportInstruction')
      continue

    const fixedPath = path.relative(
      config.output,
      path.join(path.dirname(filePath), instruction.from.$value),
    )

    instruction.from.$value = fixedPath
  }

  return ast
}
