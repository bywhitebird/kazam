import { DoubleQuotedStringContext } from '../../contexts/StringContext'
import type { Token } from '../../types/Token'
import { createToken } from '../utils/create-token'

export const DoubleQuotedStringToken = createToken({
  $name: 'DoubleQuotedStringToken',
  $rawValue: '',
  $index: 0,
  pattern: /^((?:\\")|[^"\n])*/,
  inContexts: [DoubleQuotedStringContext],
  endContexts: [DoubleQuotedStringContext],
})

export const isDoubleQuotedStringToken = (token: Token): token is typeof DoubleQuotedStringToken => token.$name === DoubleQuotedStringToken.$name
