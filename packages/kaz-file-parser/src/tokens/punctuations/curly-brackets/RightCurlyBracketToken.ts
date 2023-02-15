import { type Token, createToken } from '../../../lib/voltair'

export const RightCurlyBracketToken = createToken({
  $name: 'RightCurlyBracketToken',
  validator: /^}$/,
})

export const isRightCurlyBracketToken = (token: Token): token is typeof RightCurlyBracketToken => token.$name === RightCurlyBracketToken.$name
