import { TemplateExpressionContext } from '..'
import { Token } from '../../../lib/voltair'

export const TemplateExpressionEndToken = new Token({
  $name: 'TemplateExpressionEndToken',
  validator: /^\}/,
  singleCharacter: true,
  endContexts: [() => TemplateExpressionContext],
  inContexts: [() => TemplateExpressionContext],
  semantic: {
    type: 'punctuation',
    modifiers: ['template-expression', 'end'],
    textmateScope: ['punctuation.section.embedded.end'],
  },
})
