import { TagAttributeValueContext, TagAttributesContext } from '..'
import { Token } from '../../../lib/voltair'

export const TagRightParenthesisToken = new Token({
  $name: 'TagRightParenthesis',
  validator: /^\)$/,
  singleCharacter: true,
  inContexts: [() => TagAttributesContext, () => TagAttributeValueContext],
  endContexts: [() => TagAttributesContext, () => TagAttributeValueContext],
})
