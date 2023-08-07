import type { IHandler } from '../transformer-react'

export const handleTemplateText: IHandler<'templateText'> = async (templateText) => {
  return templateText.text.$value
}
