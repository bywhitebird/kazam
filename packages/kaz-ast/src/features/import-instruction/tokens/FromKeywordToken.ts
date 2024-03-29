import { ImportInstructionContext } from '..'
import { Token } from '../../../lib/voltair'

export const FromKeywordToken = new Token({
  $name: 'FromKeywordToken',
  validator: /^from$/,
  inContexts: [() => ImportInstructionContext],
  semantic: {
    type: 'keyword',
  },
})
