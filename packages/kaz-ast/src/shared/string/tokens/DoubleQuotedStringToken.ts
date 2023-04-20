import { Token } from '../../../lib/voltair'
import { DoubleQuotedStringContext } from '../contexts/StringContext'

export const DoubleQuotedStringToken = new Token({
  $name: 'DoubleQuotedStringToken',
  validator: /^((?:\\")|[^"\n])*/,
  getValue: rawValue => rawValue,
  inContexts: [() => DoubleQuotedStringContext],
  endContexts: [() => DoubleQuotedStringContext],
})
