import { SingleQuotedStringContext } from '../../contexts/StringContext'
import type { Token } from '../../types/Token'
import { createToken } from '../utils/create-token'

export const SingleQuotedStringToken = createToken({
  $name: 'SingleQuotedStringToken',
  $rawValue: '',
  $index: 0,
  pattern: /^((?:\\')|[^'\n])*/,
  inContexts: [SingleQuotedStringContext],
  endContexts: [SingleQuotedStringContext],
})

export const isSingleQuotedStringToken = (token: Token): token is typeof SingleQuotedStringToken => token.$name === SingleQuotedStringToken.$name
