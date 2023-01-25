import { type Token, createToken } from '../../classes/Token'

export const CommaToken = createToken({
  $name: 'CommaToken',
  pattern: /^,$/,
  singleCharacter: true,
})

export const isCommaToken = (token: Token): token is typeof CommaToken => token.$name === CommaToken.$name
