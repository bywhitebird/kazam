import { type Token, createToken } from '../../../classes/Token'
import { InstructionContext } from '../../../contexts'
import { PropInstructionContext } from '../../../contexts/instructions/prop/PropInstructionContext'

export const PropInstructionToken = createToken({
  $name: 'PropInstructionToken',
  validator: /^prop$/,
  startContexts: [PropInstructionContext],
  inContexts: [InstructionContext],
})

export const isPropInstructionToken = (token: Token): token is typeof PropInstructionToken => token.$name === PropInstructionToken.$name
