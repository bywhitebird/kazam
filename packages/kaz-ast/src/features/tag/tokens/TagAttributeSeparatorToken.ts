import { TagAttributeValueContext, TagAttributesContext } from '..'
import { CommaToken } from '../../../shared'

export const TagAttributeSeparatorToken = CommaToken.extends({
  $name: 'TagAttributeSeparator',
  inContexts: [() => TagAttributesContext, () => TagAttributeValueContext],
  endContexts: [() => TagAttributeValueContext],
})
