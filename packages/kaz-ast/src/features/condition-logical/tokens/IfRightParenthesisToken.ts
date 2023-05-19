import { ConditionLogicalContext } from '..'
import { Token } from '../../../lib/voltair'

export const IfRightParenthesisToken = new Token({
  $name: 'IfRightParenthesis',
  validator: /^\)$/,
  singleCharacter: true,
  inContexts: [() => ConditionLogicalContext],
  semantic: {
    type: 'punctuation',
    modifiers: ['parenthesis', 'right'],
    textmateScope: ['punctuation.parenthesis'],
  },
})
