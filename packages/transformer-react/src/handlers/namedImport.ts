import type { IHandler } from '../transformer-react'

export const handleNamedImport: IHandler<'namedImport'> = async (namedImport) => {
  return { name: namedImport.name.$value, alias: namedImport.alias?.$value }
}
