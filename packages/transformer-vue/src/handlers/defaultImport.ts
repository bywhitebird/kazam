import type { IHandler } from '../transformer-vue'

export const handleDefaultImport: IHandler<'defaultImport'> = (defaultImport) => {
  return { name: defaultImport.name.$value }
}
