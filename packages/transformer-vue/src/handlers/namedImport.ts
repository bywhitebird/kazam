import type { IHandler } from '../transformer-vue'

export const handleNamedImport: IHandler<'namedImport'> = (namedImport) => {
  return { name: namedImport.name.$value, alias: namedImport.alias?.$value }
}
