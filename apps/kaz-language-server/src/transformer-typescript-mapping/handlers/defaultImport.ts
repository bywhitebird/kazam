import type { IHandler } from '../transformer-typescript-mapping'

export const handleDefaultImport: IHandler<'defaultImport'> = async (defaultImport, { addGeneratedContent }) => {
  addGeneratedContent(defaultImport.name)
}
