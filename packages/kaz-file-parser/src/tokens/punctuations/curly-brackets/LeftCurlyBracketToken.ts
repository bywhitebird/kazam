import { type Token, createToken } from '../../../classes/Token'

export const LeftCurlyBracketToken = createToken({
  $name: 'LeftCurlyBracketToken',
  pattern: /^{$/,
})

export const isLeftCurlyBracketToken = (token: Token): token is typeof LeftCurlyBracketToken => token.$name === LeftCurlyBracketToken.$name
