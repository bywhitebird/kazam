import type { Token } from '../types/Token'
import { createToken } from './utils/create-token'

export const TextToken = createToken({
  $name: 'TextToken',
  $rawValue: '',
  $index: 0,
  pattern: /.+/,
})

export const isTextToken = (token: Token): token is typeof TextToken => token.$name === TextToken.$name
