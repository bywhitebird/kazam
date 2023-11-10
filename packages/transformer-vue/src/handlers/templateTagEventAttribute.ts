import type { IHandler } from '../transformer-vue'
import { upperFirst } from '../utils/upperFirst'

export const handleTemplateTagEventAttribute: IHandler<'templateTagEventAttribute'> = (templateTagEventAttribute) => {
  return `on${upperFirst(templateTagEventAttribute.name.$value)}: ${templateTagEventAttribute.expression.$value}`
}
