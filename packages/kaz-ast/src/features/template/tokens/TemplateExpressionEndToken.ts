import { TemplateExpressionContext } from '..'
import { Token } from '../../../lib/voltair'

export const TemplateExpressionEndToken = new Token({
  $name: 'TemplateExpressionEndToken',
  validator: /^\}/,
  endContexts: [() => TemplateExpressionContext],
  inContexts: [() => TemplateExpressionContext],
})
