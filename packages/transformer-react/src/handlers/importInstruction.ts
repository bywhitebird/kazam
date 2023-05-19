import type { IHandler } from '../transformer-react'

export const handleImportInstruction: IHandler<'importInstruction'> = async (importInstructions, { handle, addImport }) => {
  if (importInstructions.imports === undefined) {
    addImport({ path: importInstructions.from.$value })
  }
  else {
    await Promise.all(
      importInstructions.imports.map(async (importInstruction) => {
        addImport({
          path: importInstructions.from.$value,
          [importInstruction.$type === 'DefaultImport'
            ? 'defaultImport'
            : importInstruction.$type === 'NamedImport'
              ? 'namedImports'
              : 'wildcardImport']: (
            importInstruction.$type === 'NamedImport'
              ? [await handle(importInstruction)]
              : await handle(importInstruction)
          ),
        })
      }),
    )
  }

  return ''
}
