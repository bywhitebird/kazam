import type { IHandler } from '../transformer-react'

export const handleDefaultImport: IHandler<'defaultImport'> = async (defaultImport) => {
  return { name: defaultImport.name.$value }
}
