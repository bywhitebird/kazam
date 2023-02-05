import { type Token, createToken } from '../../classes/Token'
import { SingleQuotedStringContext } from '../../contexts/StringContext'

export const SingleQuotedStringToken = createToken({
  $name: 'SingleQuotedStringToken',
  validator: /^((?:\\')|[^'\n])*/,
  getValue: rawValue => rawValue,
  inContexts: [SingleQuotedStringContext],
  endContexts: [SingleQuotedStringContext],
})

export const isSingleQuotedStringToken = (token: Token): token is typeof SingleQuotedStringToken => token.$name === SingleQuotedStringToken.$name
