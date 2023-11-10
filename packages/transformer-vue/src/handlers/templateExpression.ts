import type { IHandler } from '../transformer-vue'

export const handleTemplateExpression: IHandler<'templateExpression'> = (templateExpression) => {
  return templateExpression.expression.$value
}
