import { ForLogicalContext } from '..'
import { Token } from '../../../lib/voltair'
import { TemplateContext } from '../../template'

export const ForLogicalToken = new Token({
  $name: 'ForLogicalToken',
  validator: /^@for$/,
  startContexts: [() => ForLogicalContext, () => TemplateContext],
  tmScope: 'keyword.control.for.kaz',
})
