import _ from 'lodash'

import type { IHandler } from '../transformer-react'

export const handleTemplateTagEventAttribute: IHandler<'templateTagEventAttribute'> = async (templateTagEventAttribute) => {
  return `on${_.upperFirst(templateTagEventAttribute.name)}={${templateTagEventAttribute.expression}}`
}
