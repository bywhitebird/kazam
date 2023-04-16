import { TagAttributesContext } from '..'
import { Token } from '../../../lib/voltair'

export const TagAttributeNameToken = new Token({
  $name: 'TagAttributeNameToken',
  validator: /^[a-zA-Z\-.\p{L}+]+$/,
  getValue: rawValue => rawValue,
  inContexts: [() => TagAttributesContext],
})
