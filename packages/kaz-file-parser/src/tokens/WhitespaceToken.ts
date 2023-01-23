import type { Token } from '../types/Token'
import { createToken } from './utils/create-token'

export const WhitespaceToken = createToken({
  $name: 'WhitespaceToken',
  $rawValue: '',
  $index: 0,
  pattern: /^\s+$/,
  ignore: true,
})

export const isWhitespaceToken = (token: Token): token is typeof WhitespaceToken => token.$name === WhitespaceToken.$name
