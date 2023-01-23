import { DoubleQuotedStringContext } from '../../../contexts/StringContext'
import type { Token } from '../../../types/Token'
import { createToken } from '../../utils/create-token'

export const DoubleQuoteToken = createToken({
  $name: 'DoubleQuoteToken',
  $rawValue: '',
  $index: 0,
  pattern: /^"$/,
  singleCharacter: true,
  startContexts: [DoubleQuotedStringContext],
  endContexts: [DoubleQuotedStringContext],
})

export const isDoubleQuoteToken = (token: Token): token is typeof DoubleQuoteToken => token.$name === DoubleQuoteToken.$name
