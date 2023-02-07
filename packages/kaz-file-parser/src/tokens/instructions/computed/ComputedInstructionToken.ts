import { type Token, createToken } from '../../../classes/Token'
import { InstructionContext } from '../../../contexts'
import { ComputedInstructionContext } from '../../../contexts/instructions/ComputedInstructionContext'

export const ComputedInstructionToken = createToken({
  $name: 'ComputedInstructionToken',
  validator: /^computed$/,
  startContexts: [ComputedInstructionContext],
  inContexts: [InstructionContext],
})

export const isComputedInstructionToken = (token: Token): token is typeof ComputedInstructionToken => token.$name === ComputedInstructionToken.$name
