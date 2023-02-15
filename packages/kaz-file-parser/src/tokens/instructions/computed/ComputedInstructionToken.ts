import { InstructionContext } from '../../../contexts'
import { ComputedInstructionContext } from '../../../contexts/instructions/ComputedInstructionContext'
import { type Token, createToken } from '../../../lib/voltair'

export const ComputedInstructionToken = createToken({
  $name: 'ComputedInstructionToken',
  validator: /^computed$/,
  startContexts: [ComputedInstructionContext],
  inContexts: [InstructionContext],
})

export const isComputedInstructionToken = (token: Token): token is typeof ComputedInstructionToken => token.$name === ComputedInstructionToken.$name
