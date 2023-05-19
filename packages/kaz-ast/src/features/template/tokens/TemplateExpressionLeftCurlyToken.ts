import { TemplateExpressionContext } from '..'
import { Token } from '../../../lib/voltair'

export const TemplateExpressionLeftCurlyToken = new Token({
  $name: 'TemplateExpressionLeftCurlyToken',
  validator: /^\{/,
  inContexts: [() => TemplateExpressionContext],
  singleCharacter: true,
  semantic: {
    type: 'punctuation',
    modifiers: ['template-expression', 'begin'],
    textmateScope: ['punctuation.section.embedded.begin'],
  },
})
