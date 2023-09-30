import type { IHandler } from '../transformer-vue'

export const handleTemplateText: IHandler<'templateText'> = (templateText) => {
  return JSON.stringify(templateText.text.$value)
}
