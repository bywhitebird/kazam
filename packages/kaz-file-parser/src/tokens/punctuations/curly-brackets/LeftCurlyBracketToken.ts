import type { Token } from '../../../types/Token'
import { createToken } from '../../utils/create-token'

export const LeftCurlyBracketToken = createToken({
  $name: 'LeftCurlyBracketToken',
  $rawValue: '',
  $index: 0,
  pattern: /^{$/,
})

export const isLeftCurlyBracketToken = (token: Token): token is typeof LeftCurlyBracketToken => token.$name === LeftCurlyBracketToken.$name
