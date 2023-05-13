import { ImportInstructionContext } from '..'
import { Token } from '../../../lib/voltair'

export const FromKeywordToken = new Token({
  $name: 'FromKeywordToken',
  validator: /^from$/,
  inContexts: [() => ImportInstructionContext],
  tmScope: 'keyword.control.from.kaz',
})
