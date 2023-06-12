import type { IHandler } from '../transformer-vue'
import { transformVueExpression } from '../utils/transform-vue-expression'

export const handleTemplateTagAttribute: IHandler<'templateTagAttribute'> = async (templateTagAttribute) => {
  return `"${templateTagAttribute.name}": `
    + `${('value' in templateTagAttribute && typeof templateTagAttribute.value === 'string') ? `"${templateTagAttribute.value}"` : ''}`
    + `${('value' in templateTagAttribute && typeof templateTagAttribute.value === 'boolean') ? `${templateTagAttribute.value}` : ''}`
    + `${('expression' in templateTagAttribute) ? `${transformVueExpression(templateTagAttribute.expression)}` : ''}`
}
