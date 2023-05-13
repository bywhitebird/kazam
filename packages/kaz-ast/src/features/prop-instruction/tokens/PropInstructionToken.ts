import { PropInstructionContext } from '..'
import { Token } from '../../../lib/voltair'
import { InstructionContext } from '../../instruction'

export const PropInstructionToken = new Token({
  $name: 'PropInstructionToken',
  validator: /^prop$/,
  startContexts: [() => PropInstructionContext],
  inContexts: [() => InstructionContext],
  tmScope: 'keyword.control',
})
