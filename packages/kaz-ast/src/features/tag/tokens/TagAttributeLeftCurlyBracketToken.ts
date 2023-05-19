import { TagAttributeValueContext, TagAttributeValueExpressionContext } from '..'
import { LeftCurlyBracketToken } from '../../../shared'

export const TagAttributeLeftCurlyBracketToken = LeftCurlyBracketToken.extends({
  $name: 'TagAttributeLeftCurlyBracket',
  startContexts: [() => TagAttributeValueExpressionContext],
  inContexts: [() => TagAttributeValueContext],
  semantic: {
    type: 'punctuation',
    modifiers: ['template-expression', 'begin'],
    textmateScope: ['punctuation.section.embedded.begin'],
  },
})
