import type { IHandler } from '../transformer-typescript'

export const handleTemplateTagAttribute: IHandler<'templateTagAttribute'> = (templateTagAttribute, { addGeneratedContent }) => {
  addGeneratedContent(templateTagAttribute.name)
  addGeneratedContent(': ')

  if ('value' in templateTagAttribute && templateTagAttribute.value !== undefined) {
    if (typeof templateTagAttribute.value === 'boolean') {
      addGeneratedContent(templateTagAttribute.value ? 'true' : 'false')
    }
    else {
      addGeneratedContent('"')
      addGeneratedContent(templateTagAttribute.value)
      addGeneratedContent('"')
    }
  }
  else if ('expression' in templateTagAttribute) {
    addGeneratedContent(templateTagAttribute.expression)
  }
  else {
    throw new Error('Tag attribute must have either a value or an expression')
  }

  // Add a trailing comma if this is not the last attribute
  addGeneratedContent(',\n')
}
