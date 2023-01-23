import { InstructionContext } from '../../contexts'
import type { Token } from '../../types/Token'
import { createToken } from '../utils/create-token'

export const StartInstructionToken = createToken({
  $name: 'StartInstructionToken',
  $rawValue: '',
  $index: 0,
  pattern: /^-$/,
  startContexts: [InstructionContext],
})

export const isStartInstructionToken = (token: Token): token is typeof StartInstructionToken => token.$name === StartInstructionToken.$name
