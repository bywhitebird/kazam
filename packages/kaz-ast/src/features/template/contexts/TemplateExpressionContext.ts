import { TemplateExpressionEndToken, TemplateExpressionLeftCurlyToken } from '..'
import { Context } from '../../../lib/voltair'
import { ExpressionToken } from '../../../shared'

export const TemplateExpressionContext: Context<'TemplateExpressionContext'> = new Context({
  $name: 'TemplateExpressionContext',
  breakingPatterns: [/\}$/],
  availableTokens: [
    () => ExpressionToken,
    () => TemplateExpressionEndToken,
    () => TemplateExpressionLeftCurlyToken,
  ],
})
