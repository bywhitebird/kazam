import { type Token, createToken } from '../../classes/Token'
import { InstructionContext } from '../../contexts'

export const StartInstructionToken = createToken({
  $name: 'StartInstructionToken',
  pattern: /^-$/,
  startContexts: [InstructionContext],
})

export const isStartInstructionToken = (token: Token): token is typeof StartInstructionToken => token.$name === StartInstructionToken.$name
