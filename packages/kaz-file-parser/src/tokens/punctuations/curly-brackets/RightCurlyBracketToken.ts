import type { Token } from '../../../types/Token'
import { createToken } from '../../utils/create-token'

export const RightCurlyBracketToken = createToken({
  $name: 'RightCurlyBracketToken',
  $rawValue: '',
  $index: 0,
  pattern: /^}$/,
})

export const isRightCurlyBracketToken = (token: Token): token is typeof RightCurlyBracketToken => token.$name === RightCurlyBracketToken.$name
