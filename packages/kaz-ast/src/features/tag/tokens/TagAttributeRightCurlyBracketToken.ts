import { TagAttributeValueContext, TagAttributeValueExpressionContext } from '..'
import { RightCurlyBracketToken } from '../../../shared'

export const TagAttributeRightCurlyBracketToken = RightCurlyBracketToken.extends({
  $name: 'TagAttributeRightCurlyBracket',
  endContexts: [() => TagAttributeValueExpressionContext, () => TagAttributeValueContext],
  inContexts: [() => TagAttributeValueContext],
  semantic: {
    type: 'punctuation',
    modifiers: ['template-expression', 'end'],
    textmateScope: ['punctuation.section.embedded.end'],
  },
})
