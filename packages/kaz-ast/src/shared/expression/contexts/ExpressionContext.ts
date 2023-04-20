import { ExpressionToken } from '..'
import { Context } from '../../../lib/voltair'

export const ExpressionContext: Context<'ExpressionContext'> = new Context({
  $name: 'ExpressionContext',
  breakingPatterns: [/\n+/, /;/],
  availableTokens: [ExpressionToken],
})
