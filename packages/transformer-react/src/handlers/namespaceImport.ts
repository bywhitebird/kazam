import type { IHandler } from '../transformer-react'

export const handleNamespaceImport: IHandler<'namespaceImport'> = async (namespaceImport) => {
  return { alias: namespaceImport.name }
}
