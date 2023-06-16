import type { IHandler } from '../transformer-typescript'

export const handleNamespaceImport: IHandler<'namespaceImport'> = async (namespaceImport, { addGeneratedContent }) => {
  addGeneratedContent('* as ')
  addGeneratedContent(namespaceImport.name)
}
