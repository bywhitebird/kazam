import { type Token, createToken } from '../../classes/Token'
import { DoubleQuotedStringContext } from '../../contexts/StringContext'

export const DoubleQuotedStringToken = createToken({
  $name: 'DoubleQuotedStringToken',
  validator: /^((?:\\")|[^"\n])*/,
  getValue: rawValue => rawValue,
  inContexts: [DoubleQuotedStringContext],
  endContexts: [DoubleQuotedStringContext],
})

export const isDoubleQuotedStringToken = (token: Token): token is typeof DoubleQuotedStringToken => token.$name === DoubleQuotedStringToken.$name
