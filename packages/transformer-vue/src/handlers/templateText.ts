import type { IHandler } from '../transformer-vue'

export const handleTemplateText: IHandler<'templateText'> = async (templateText) => {
  return JSON.stringify(templateText.text.$value)
}
