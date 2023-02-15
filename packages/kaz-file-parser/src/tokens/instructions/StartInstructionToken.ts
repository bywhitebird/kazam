import { InstructionContext } from '../../contexts'
import { type Token, createToken } from '../../lib/voltair'

export const StartInstructionToken = createToken({
  $name: 'StartInstructionToken',
  validator: /^-$/,
  startContexts: [InstructionContext],
})

export const isStartInstructionToken = (token: Token): token is typeof StartInstructionToken => token.$name === StartInstructionToken.$name
