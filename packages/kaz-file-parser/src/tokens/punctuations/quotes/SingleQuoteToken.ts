import { SingleQuotedStringContext } from '../../../contexts/StringContext'
import type { Token } from '../../../types/Token'
import { createToken } from '../../utils/create-token'

export const SingleQuoteToken = createToken({
  $name: 'SingleQuoteToken',
  $rawValue: '',
  $index: 0,
  pattern: /^'$/,
  singleCharacter: true,
  startContexts: [SingleQuotedStringContext],
  endContexts: [SingleQuotedStringContext],
})

export const isSingleQuoteToken = (token: Token): token is typeof SingleQuoteToken => token.$name === SingleQuoteToken.$name
