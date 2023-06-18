import { TemplateContext, TemplateExpressionContext } from '..'
import { Token } from '../../../lib/voltair'

export const TemplateExpressionStartToken = new Token({
  $name: 'TemplateExpressionStartToken',
  validator: /^\$/,
  startContexts: [() => TemplateExpressionContext],
  inContexts: [() => TemplateContext],
  singleCharacter: true,
  semantic: {
    type: 'punctuation',
    modifiers: ['template-expression', 'begin'],
    textmateScope: ['punctuation.section.embedded.begin'],
  },
})
