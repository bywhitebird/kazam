import type { IHandler } from '../transformer-react'

export const handleImportInstruction: IHandler<'importInstruction'> = (importInstructions, { handle, addImport }) => {
  if (importInstructions.imports === undefined) {
    addImport({ path: importInstructions.from.$value })
  }
  else {
    importInstructions.imports.forEach((importInstruction) => {
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
    })
  }

  return ''
}
