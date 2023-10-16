import path from 'node:path'

import type { KazAst } from '@whitebird/kaz-ast'

export function fixAstImportPaths(
  ast: KazAst,
  { filePath, output }: { filePath: string; input: string[]; output: string },
) {
  for (const instruction of ast.instructions) {
    if (instruction.$type !== 'ImportInstruction')
      continue

    const fixedPath = path.relative(
      output,
      path.join(path.dirname(filePath), instruction.from.$value),
    )

    instruction.from.$value = fixedPath
  }

  return ast
}
