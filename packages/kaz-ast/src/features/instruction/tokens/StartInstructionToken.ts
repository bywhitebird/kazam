import { InstructionContext } from '..'
import { Token } from '../../../lib/voltair'

export const StartInstructionToken = new Token({
  $name: 'StartInstructionToken',
  validator: /^-$/,
  startContexts: [() => InstructionContext],
  tmScope: 'keyword.control',
})
