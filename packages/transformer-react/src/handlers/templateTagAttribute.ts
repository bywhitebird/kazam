import type { IHandler } from '../transformer-react'

export const handleTemplateTagAttribute: IHandler<'templateTagAttribute'> = async (templateTagAttribute) => {
  return `${templateTagAttribute.name}=\
  ${('value' in templateTagAttribute && typeof templateTagAttribute.value === 'string') ? `"${templateTagAttribute.value}"` : ''}\
  ${('value' in templateTagAttribute && typeof templateTagAttribute.value === 'boolean') ? `{${templateTagAttribute.value}}` : ''}\
  ${('expression' in templateTagAttribute) ? `{${templateTagAttribute.expression}}` : ''}`
}
