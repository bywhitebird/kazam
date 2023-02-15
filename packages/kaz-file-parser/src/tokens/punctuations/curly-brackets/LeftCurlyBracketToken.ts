import { type Token, createToken } from '../../../lib/voltair'

export const LeftCurlyBracketToken = createToken({
  $name: 'LeftCurlyBracketToken',
  validator: /^{$/,
})

export const isLeftCurlyBracketToken = (token: Token): token is typeof LeftCurlyBracketToken => token.$name === LeftCurlyBracketToken.$name
