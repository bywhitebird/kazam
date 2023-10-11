import type { IHandler } from '../transformer-vue'
import { transformVueExpression } from '../utils/transform-vue-expression'

export const handleTemplateExpression: IHandler<'templateExpression'> = (templateExpression) => {
  return transformVueExpression(templateExpression.expression.$value)
}
