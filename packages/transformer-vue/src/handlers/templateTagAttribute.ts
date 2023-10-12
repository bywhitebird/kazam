import type { IHandler } from '../transformer-vue'
import { transformVueExpression } from '../utils/transform-vue-expression'

export const handleTemplateTagAttribute: IHandler<'templateTagAttribute'> = (templateTagAttribute) => {
  let value = ''

  if ('value' in templateTagAttribute && typeof templateTagAttribute.value === 'object' && '$value' in templateTagAttribute.value)
    value = `"${templateTagAttribute.value.$value}"`
  else if ('value' in templateTagAttribute && typeof templateTagAttribute.value === 'boolean')
    value = `${templateTagAttribute.value}`
  else if ('expression' in templateTagAttribute)
    value = transformVueExpression(templateTagAttribute.expression.$value)

  return `"${templateTagAttribute.name.$value}": ${value}`
}
