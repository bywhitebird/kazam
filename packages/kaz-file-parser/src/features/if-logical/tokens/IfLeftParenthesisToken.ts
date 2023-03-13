import { IfConditionContext, IfLogicalContext } from '..'
import { LeftParenthesisToken } from '../../../shared'

export const IfLeftParenthesisToken = LeftParenthesisToken.extends({
  $name: 'IfLeftParenthesis',
  startContexts: [() => IfConditionContext],
  inContexts: [() => IfLogicalContext],
})
