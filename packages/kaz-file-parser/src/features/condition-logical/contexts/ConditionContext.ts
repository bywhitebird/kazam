import { IfConditionToken, IfRightParenthesisToken } from '..'
import { Context } from '../../../lib/voltair'

export const ConditionContext: Context<'ConditionContext'> = new Context({
  $name: 'ConditionContext',
  breakingPatterns: [/^\(/, /\)$/],
  availableTokens: [() => IfConditionToken, () => IfRightParenthesisToken],
})
