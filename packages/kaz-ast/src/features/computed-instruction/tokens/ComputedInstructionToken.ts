import { ComputedInstructionContext } from '..'
import { Token } from '../../../lib/voltair'
import { InstructionContext } from '../../instruction'

export const ComputedInstructionToken = new Token({
  $name: 'ComputedInstructionToken',
  validator: /^computed$/,
  startContexts: [() => ComputedInstructionContext],
  inContexts: [() => InstructionContext],
  tmScope: 'keyword.control.kaz',
})
