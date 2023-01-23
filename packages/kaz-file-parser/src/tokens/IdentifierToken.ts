import type { Token } from '../types/Token'
import { createToken } from './utils/create-token'

export const IdentifierToken = createToken({
  $name: 'IdentifierToken',
  $rawValue: '',
  $index: 0,
  pattern: /^[a-zA-Z_$][a-zA-Z_$0-9]*$/,
})

export const isIdentifierToken = (token: Token): token is typeof IdentifierToken => token.$name === IdentifierToken.$name
