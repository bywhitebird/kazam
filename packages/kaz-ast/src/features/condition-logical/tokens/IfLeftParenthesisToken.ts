import { ConditionContext, ConditionLogicalContext } from '..'
import { Token } from '../../../lib/voltair'

export const IfLeftParenthesisToken = new Token({
  $name: 'IfLeftParenthesis',
  validator: /^\($/,
  singleCharacter: true,
  startContexts: [() => ConditionContext],
  inContexts: [() => ConditionLogicalContext],
  semantic: {
    type: 'punctuation',
    modifiers: ['parenthesis', 'left'],
    textmateScope: ['punctuation.parenthesis'],
  },
})
