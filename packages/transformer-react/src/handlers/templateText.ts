import type { IHandler } from '../transformer-react'

export const handleTemplateText: IHandler<'templateText'> = (templateText) => {
  return templateText.text.$value
}
