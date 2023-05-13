import { ConditionContext, ConditionLogicalContext } from '..'
import { Token } from '../../../lib/voltair'

export const IfLeftParenthesisToken = new Token({
  $name: 'IfLeftParenthesis',
  validator: /^\($/,
  singleCharacter: true,
  startContexts: [() => ConditionContext],
  inContexts: [() => ConditionLogicalContext],
  tmScope: 'punctuation.section.parens.begin.kaz',
})
