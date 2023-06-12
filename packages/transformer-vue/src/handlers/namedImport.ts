import type { IHandler } from '../transformer-vue'

export const handleNamedImport: IHandler<'namedImport'> = async (namedImport) => {
  return { name: namedImport.name, alias: namedImport.alias }
}
