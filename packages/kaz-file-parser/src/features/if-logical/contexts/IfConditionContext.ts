import { IfConditionToken, IfRightParenthesisToken } from '..'
import { Context } from '../../../lib/voltair'

export const IfConditionContext: Context<'IfConditionContext'> = new Context({
  $name: 'IfConditionContext',
  breakingPatterns: [/^\(/, /\)$/],
  availableTokens: [() => IfConditionToken, () => IfRightParenthesisToken],
})
