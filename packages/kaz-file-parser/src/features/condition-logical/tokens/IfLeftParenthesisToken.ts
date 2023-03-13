import { ConditionContext, ConditionLogicalContext } from '..'
import { LeftParenthesisToken } from '../../../shared'

export const IfLeftParenthesisToken = LeftParenthesisToken.extends({
  $name: 'IfLeftParenthesis',
  startContexts: [() => ConditionContext],
  inContexts: [() => ConditionLogicalContext],
})
