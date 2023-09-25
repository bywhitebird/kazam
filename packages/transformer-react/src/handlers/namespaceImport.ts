import type { IHandler } from '../transformer-react'

export const handleNamespaceImport: IHandler<'namespaceImport'> = (namespaceImport) => {
  return { alias: namespaceImport.name.$value }
}
