import { InstructionContext } from '../../../contexts'
import { PropInstructionContext } from '../../../contexts/instructions/PropInstructionContext'
import { type Token, createToken } from '../../../lib/voltair'

export const PropInstructionToken = createToken({
  $name: 'PropInstructionToken',
  validator: /^prop$/,
  startContexts: [PropInstructionContext],
  inContexts: [InstructionContext],
})

export const isPropInstructionToken = (token: Token): token is typeof PropInstructionToken => token.$name === PropInstructionToken.$name
