import type { IHandler } from '../transformer-react'
import { upperFirst } from '../utils/upperFirst'

export const handleTemplateTagEventAttribute: IHandler<'templateTagEventAttribute'> = async (templateTagEventAttribute, { transformExpression }) => {
  return `on${upperFirst(templateTagEventAttribute.name.$value)}={${await transformExpression(templateTagEventAttribute.expression)}}`
}
