import { type Token, createToken } from '../../../classes/Token'
import { InstructionContext } from '../../../contexts'
import { StateInstructionContext } from '../../../contexts/instructions/StateInstructionContext'

export const StateInstructionToken = createToken({
  $name: 'StateInstructionToken',
  validator: /^state$/,
  startContexts: [StateInstructionContext],
  inContexts: [InstructionContext],
})

export const isStateInstructionToken = (token: Token): token is typeof StateInstructionToken => token.$name === StateInstructionToken.$name
