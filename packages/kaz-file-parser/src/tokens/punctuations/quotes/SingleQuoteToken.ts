import { type Token, createToken } from '../../../classes/Token'
import { SingleQuotedStringContext } from '../../../contexts/StringContext'

export const SingleQuoteToken = createToken({
  $name: 'SingleQuoteToken',
  validator: /^'$/,
  singleCharacter: true,
  startContexts: [SingleQuotedStringContext],
  endContexts: [SingleQuotedStringContext],
})

export const isSingleQuoteToken = (token: Token): token is typeof SingleQuoteToken => token.$name === SingleQuoteToken.$name
