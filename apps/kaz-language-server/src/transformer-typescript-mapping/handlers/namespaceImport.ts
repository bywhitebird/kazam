import type { IHandler } from '../transformer-typescript-mapping'

export const handleNamespaceImport: IHandler<'namespaceImport'> = async (namespaceImport, { addGeneratedContent }) => {
  addGeneratedContent('* as ')
  addGeneratedContent(namespaceImport.name)
}
