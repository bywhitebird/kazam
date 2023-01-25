import { type Token, createToken } from '../../../classes/Token'

export const RightCurlyBracketToken = createToken({
  $name: 'RightCurlyBracketToken',
  pattern: /^}$/,
})

export const isRightCurlyBracketToken = (token: Token): token is typeof RightCurlyBracketToken => token.$name === RightCurlyBracketToken.$name
