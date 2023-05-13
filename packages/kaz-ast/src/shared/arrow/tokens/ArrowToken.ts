import { ExpressionContext } from '../..'
import { Token } from '../../../lib/voltair'

export const ArrowToken = new Token({
  $name: 'ArrowToken',
  validator: /^=>$/,
  startContexts: [() => ExpressionContext],
  tmScope: 'punctuation.definition.arrow',
})
