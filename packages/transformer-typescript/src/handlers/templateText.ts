import type { IHandler } from '../transformer-typescript'

export const handleTemplateText: IHandler<'templateText'> = async () => {
  // Text does not define or use any variables, so we don't need to do anything here.
}
