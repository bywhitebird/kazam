import { type Token, createToken } from '../classes/Token'

export const WhitespaceToken = createToken({
  $name: 'WhitespaceToken',
  pattern: /^\s+$/,
  ignore: true,
})

export const isWhitespaceToken = (token: Token): token is typeof WhitespaceToken => token.$name === WhitespaceToken.$name
