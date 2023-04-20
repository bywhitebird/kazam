import { TagAttributeRightCurlyBracketToken } from '..'
import { Context } from '../../../lib/voltair'
import { ExpressionToken, WhitespaceToken } from '../../../shared'

export const TagAttributeValueExpressionContext: Context<'TagAttributeValueExpressionContext'> = new Context({
  $name: 'TagAttributeValueExpressionContext',
  breakingPatterns: [/\}$/],
  availableTokens: [
    () => ExpressionToken,
    () => WhitespaceToken,
    () => TagAttributeRightCurlyBracketToken,
  ],
})
