import type { Token } from '../../types/Token'
import { createToken } from '../utils/create-token'

export const CommaToken = createToken({
  $name: 'CommaToken',
  $rawValue: '',
  $index: 0,
  pattern: /^,$/,
  singleCharacter: true,
})

export const isCommaToken = (token: Token): token is typeof CommaToken => token.$name === CommaToken.$name
