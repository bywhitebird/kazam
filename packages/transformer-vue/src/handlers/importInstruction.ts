import type { IHandler } from '../transformer-vue'

export const handleImportInstruction: IHandler<'importInstruction'> = async (importInstructions, { handle, addImport }) => {
  if (importInstructions.imports === undefined) {
    addImport({ path: importInstructions.from })
  }
  else {
    await Promise.all(
      importInstructions.imports.map(async (importInstruction) => {
        addImport({
          path: importInstructions.from,
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
