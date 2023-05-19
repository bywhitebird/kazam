import type { IHandler } from '../transformer-react'
import { upperFirst } from '../utils/upperFirst'

export const handleTemplateTagEventAttribute: IHandler<'templateTagEventAttribute'> = async (templateTagEventAttribute) => {
  return `on${upperFirst(templateTagEventAttribute.name.$value)}={${templateTagEventAttribute.expression.$value}}`
}
