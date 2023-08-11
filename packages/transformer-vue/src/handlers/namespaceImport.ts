import type { IHandler } from '../transformer-vue'

export const handleNamespaceImport: IHandler<'namespaceImport'> = async (namespaceImport) => {
  return { alias: namespaceImport.name.$value }
}
