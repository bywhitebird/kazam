import type { IHandler } from '../transformer-react'
import { upperFirst } from '../utils/upperFirst'

export const handleTemplateTagEventAttribute: IHandler<'templateTagEventAttribute'> = (templateTagEventAttribute, { transformExpression }) => {
  return `on${upperFirst(templateTagEventAttribute.name.$value)}={${transformExpression(templateTagEventAttribute.expression)}}`
}
