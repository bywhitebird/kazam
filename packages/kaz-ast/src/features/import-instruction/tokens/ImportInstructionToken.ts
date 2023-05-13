import { ImportInstructionContext } from '..'
import { Token } from '../../../lib/voltair'
import { InstructionContext } from '../../instruction'

export const ImportInstructionToken = new Token({
  $name: 'ImportInstructionToken',
  validator: /^import$/,
  startContexts: [() => ImportInstructionContext],
  inContexts: [() => InstructionContext],
  tmScope: 'keyword.control',
})
