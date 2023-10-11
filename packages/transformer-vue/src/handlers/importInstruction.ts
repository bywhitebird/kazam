import type { IHandler } from '../transformer-vue'

export const handleImportInstruction: IHandler<'importInstruction'> = (importInstructions, { handle, addImport }) => {
  if (importInstructions.imports === undefined) {
    addImport({ path: importInstructions.from.$value })
  }
  else {
    for (const importInstruction of importInstructions.imports) {
      addImport({
        path: importInstructions.from.$value,
        [importInstruction.$type === 'DefaultImport'
          ? 'defaultImport'
          : importInstruction.$type === 'NamedImport'
            ? 'namedImports'
            : 'wildcardImport']: (
          importInstruction.$type === 'NamedImport'
            ? [handle(importInstruction)]
            : handle(importInstruction)
        ),
      })
    }
  }

  return ''
}
