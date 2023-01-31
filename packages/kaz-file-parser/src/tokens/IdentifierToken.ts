import { type Token, createToken } from '../classes/Token'

export const IdentifierToken = createToken({
  $name: 'IdentifierToken',
  pattern: /^[a-zA-Z_$][a-zA-Z_$0-9]*$/,
  getValue: rawValue => rawValue,
})

export const isIdentifierToken = (token: Token): token is typeof IdentifierToken => token.$name === IdentifierToken.$name
