import { TagAttributeEqualToken, TagAttributeLeftCurlyBracketToken, TagAttributeNameToken, TagAttributeRightCurlyBracketToken, TagAttributeSeparatorToken, TagEventAttributeNameToken, TagRightParenthesisToken } from '..'
import { Context } from '../../../lib/voltair'
import { WhitespaceToken } from '../../../shared'

export const TagAttributesContext: Context<'TagAttributesContext'> = new Context({
  $name: 'TagAttributesContext',
  breakingPatterns: [/^\(/, /\)$/, /\s+/, /,/, /^\s*=\s*$/],
  availableTokens: [
    () => TagAttributeNameToken,
    () => TagEventAttributeNameToken,
    () => TagAttributeSeparatorToken,
    () => TagRightParenthesisToken,
    () => TagAttributeEqualToken,
    () => TagAttributeLeftCurlyBracketToken,
    () => TagAttributeRightCurlyBracketToken,
    () => WhitespaceToken,
  ],
})
