import { type Token, createToken } from '../classes/Token'

export const TextToken = createToken({
  $name: 'TextToken',
  pattern: /.+/,
  getValue: rawValue => rawValue,
})

export const isTextToken = (token: Token): token is typeof TextToken => token.$name === TextToken.$name
