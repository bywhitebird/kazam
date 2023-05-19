import { Token } from '../../../lib/voltair'
import { DoubleQuotedStringContext } from '../contexts/StringContext'

export const DoubleQuoteToken = new Token({
  $name: 'DoubleQuoteToken',
  validator: /^"$/,
  singleCharacter: true,
  startContexts: [() => DoubleQuotedStringContext],
  endContexts: [() => DoubleQuotedStringContext],
  semantic: {
    type: 'string',
  },
})
