import type { IHandler } from '../transformer-vue'

export const handleDefaultImport: IHandler<'defaultImport'> = async (defaultImport) => {
  return { name: defaultImport.name }
}
