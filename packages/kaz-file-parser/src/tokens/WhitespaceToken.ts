import { type Token, createToken } from '../lib/voltair'

export const WhitespaceToken = createToken({
  $name: 'WhitespaceToken',
  validator: /^\s+$/,
  ignore: true,
})

export const isWhitespaceToken = (token: Token): token is typeof WhitespaceToken => token.$name === WhitespaceToken.$name
