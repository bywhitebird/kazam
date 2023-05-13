import { StateInstructionContext } from '..'
import { Token } from '../../../lib/voltair'
import { InstructionContext } from '../../instruction'

export const StateInstructionToken = new Token({
  $name: 'StateInstructionToken',
  validator: /^state$/,
  startContexts: [() => StateInstructionContext],
  inContexts: [() => InstructionContext],
  tmScope: 'keyword.control',
})
