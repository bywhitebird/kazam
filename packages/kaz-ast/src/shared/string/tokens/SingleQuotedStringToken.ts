import { Token } from '../../../lib/voltair'
import { SingleQuotedStringContext } from '../contexts/StringContext'

export const SingleQuotedStringToken = new Token({
  $name: 'SingleQuotedStringToken',
  validator: /^((?:\\')|[^'\n])*/,
  getValue: rawValue => rawValue,
  inContexts: [() => SingleQuotedStringContext],
  endContexts: [() => SingleQuotedStringContext],
})
