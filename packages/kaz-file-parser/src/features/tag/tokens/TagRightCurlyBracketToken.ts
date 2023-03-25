import { TagAttributeValueContext, TagAttributeValueExpressionContext } from '..'
import { RightCurlyBracketToken } from '../../../shared'

export const TagAttributeRightCurlyBracketToken = RightCurlyBracketToken.extends({
  $name: 'TagAttributeRightCurlyBracket',
  endContexts: [() => TagAttributeValueExpressionContext, () => TagAttributeValueContext],
  inContexts: [() => TagAttributeValueContext],
})
