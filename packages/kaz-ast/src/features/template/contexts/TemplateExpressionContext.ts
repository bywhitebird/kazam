import { TemplateExpressionEndToken } from '..'
import { Context } from '../../../lib/voltair'
import { ExpressionToken, LeftCurlyBracketToken } from '../../../shared'

export const TemplateExpressionContext: Context<'TemplateExpressionContext'> = new Context({
  $name: 'TemplateExpressionContext',
  breakingPatterns: [/\}$/, /\s+/],
  availableTokens: [
    () => ExpressionToken,
    () => TemplateExpressionEndToken,
    () => LeftCurlyBracketToken,
  ],
})
