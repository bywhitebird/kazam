import type { IHandler } from '../transformer-vue'
import { transformVueExpression } from '../utils/transform-vue-expression'
import { upperFirst } from '../utils/upperFirst'

export const handleTemplateTagEventAttribute: IHandler<'templateTagEventAttribute'> = async (templateTagEventAttribute) => {
  return `on${upperFirst(templateTagEventAttribute.name.$value)}: ${transformVueExpression(templateTagEventAttribute.expression.$value)}`
}
