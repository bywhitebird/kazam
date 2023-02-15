import { type Token, createToken } from '../lib/voltair'

export const TextToken = createToken({
  $name: 'TextToken',
  validator: /.+/,
  getValue: rawValue => rawValue,
})

export const isTextToken = (token: Token): token is typeof TextToken => token.$name === TextToken.$name
