import { TagAttributeValueContext, TagAttributeValueExpressionContext } from '..'
import { LeftCurlyBracketToken } from '../../../shared'

export const TagAttributeLeftCurlyBracketToken = LeftCurlyBracketToken.extends({
  $name: 'TagAttributeLeftCurlyBracket',
  startContexts: [() => TagAttributeValueExpressionContext],
  inContexts: [() => TagAttributeValueContext],
  tmScope: 'punctuation.section.embedded.begin',
})
