import type { IHandler } from '../transformer-react'

export const handleDefaultImport: IHandler<'defaultImport'> = (defaultImport) => {
  return { name: defaultImport.name.$value }
}
