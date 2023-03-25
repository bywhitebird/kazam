import { TagAttributeLeftCurlyBracketToken, TagAttributeRightCurlyBracketToken, TagAttributeSeparatorToken, TagRightParenthesisToken } from '..'
import { Context } from '../../../lib/voltair'
import { DoubleQuoteToken, DoubleQuotedStringToken, SingleQuoteToken, SingleQuotedStringToken, WhitespaceToken } from '../../../shared'

export const TagAttributeValueContext: Context<'TagAttributeValueContext'> = new Context({
  $name: 'TagAttributeValueContext',
  breakingPatterns: [/^\{/, /\}$/, /\s+/, /,/, /^\)$/],
  availableTokens: [
    () => TagAttributeSeparatorToken,
    () => TagRightParenthesisToken,
    () => TagAttributeLeftCurlyBracketToken,
    () => TagAttributeRightCurlyBracketToken,
    () => DoubleQuoteToken,
    () => DoubleQuotedStringToken,
    () => SingleQuoteToken,
    () => SingleQuotedStringToken,
    () => WhitespaceToken,
  ],
})
