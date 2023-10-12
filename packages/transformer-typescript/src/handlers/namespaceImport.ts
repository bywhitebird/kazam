import type { IHandler } from '../transformer-typescript'

export const handleNamespaceImport: IHandler<'namespaceImport'> = (namespaceImport, { addGeneratedContent }) => {
  addGeneratedContent('* as ')
  addGeneratedContent(namespaceImport.name)
}
