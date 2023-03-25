import { TagAttributeValueContext, TagAttributesContext } from '..'
import { EqualToken } from '../../../shared'

export const TagAttributeEqualToken = EqualToken.extends({
  $name: 'TagAttributeEqual',
  inContexts: [() => TagAttributesContext],
  startContexts: [() => TagAttributeValueContext],
})
