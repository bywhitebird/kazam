import { TemplateExpressionContext } from '..'
import { Token } from '../../../lib/voltair'

export const TemplateExpressionStartToken = new Token({
  $name: 'TemplateExpressionStartToken',
  validator: /^\${/,
  startContexts: [() => TemplateExpressionContext],
  tmScope: 'punctuation.definition.template-expression.begin',
  tmMatch: '\\${',
})
