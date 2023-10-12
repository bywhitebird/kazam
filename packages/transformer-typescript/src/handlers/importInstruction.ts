import type { IHandler } from '../transformer-typescript'

export const handleImportInstruction: IHandler<'importInstruction'> = (importInstruction, { addGeneratedContent, handle }) => {
  addGeneratedContent('import ')

  if (importInstruction.imports !== undefined && importInstruction.imports.length > 0) {
    importInstruction.imports.forEach(handle)
    addGeneratedContent(' from ')
  }

  addGeneratedContent('"')
  addGeneratedContent(importInstruction.from)
  addGeneratedContent('";\n')
}
