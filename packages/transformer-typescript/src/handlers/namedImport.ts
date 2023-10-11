import type { IHandler } from '../transformer-typescript'

export const handleNamedImport: IHandler<'namedImport'> = (namedImport, { addGeneratedContent }) => {
  addGeneratedContent('{ ')
  addGeneratedContent(namedImport.name)

  if (namedImport.alias !== undefined) {
    addGeneratedContent(' as ')
    addGeneratedContent(namedImport.alias)
  }

  addGeneratedContent(' }')
}
