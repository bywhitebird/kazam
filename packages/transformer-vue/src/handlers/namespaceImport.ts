import type { IHandler } from '../transformer-vue'

export const handleNamespaceImport: IHandler<'namespaceImport'> = (namespaceImport) => {
  return { alias: namespaceImport.name.$value }
}
