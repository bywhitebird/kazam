import type { IHandler } from '../transformer-typescript'

export const handleDefaultImport: IHandler<'defaultImport'> = async (defaultImport, { addGeneratedContent }) => {
  addGeneratedContent(defaultImport.name)
}
