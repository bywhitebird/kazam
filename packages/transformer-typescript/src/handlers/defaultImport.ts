import type { IHandler } from '../transformer-typescript'

export const handleDefaultImport: IHandler<'defaultImport'> = (defaultImport, { addGeneratedContent }) => {
  addGeneratedContent(defaultImport.name)
}
