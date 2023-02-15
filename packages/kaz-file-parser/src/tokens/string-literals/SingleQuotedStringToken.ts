import { SingleQuotedStringContext } from '../../contexts/StringContext'
import { type Token, createToken } from '../../lib/voltair'

export const SingleQuotedStringToken = createToken({
  $name: 'SingleQuotedStringToken',
  validator: /^((?:\\')|[^'\n])*/,
  getValue: rawValue => rawValue,
  inContexts: [SingleQuotedStringContext],
  endContexts: [SingleQuotedStringContext],
})

export const isSingleQuotedStringToken = (token: Token): token is typeof SingleQuotedStringToken => token.$name === SingleQuotedStringToken.$name
