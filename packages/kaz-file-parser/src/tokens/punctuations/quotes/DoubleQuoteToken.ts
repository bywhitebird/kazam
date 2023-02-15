import { DoubleQuotedStringContext } from '../../../contexts/StringContext'
import { type Token, createToken } from '../../../lib/voltair'

export const DoubleQuoteToken = createToken({
  $name: 'DoubleQuoteToken',
  validator: /^"$/,
  singleCharacter: true,
  startContexts: [DoubleQuotedStringContext],
  endContexts: [DoubleQuotedStringContext],
})

export const isDoubleQuoteToken = (token: Token): token is typeof DoubleQuoteToken => token.$name === DoubleQuoteToken.$name
