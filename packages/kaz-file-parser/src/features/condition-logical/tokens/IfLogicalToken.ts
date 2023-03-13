import { ConditionLogicalContext } from '..'
import { Token } from '../../../lib/voltair'
import { TemplateContext } from '../../template'

export const IfLogicalToken = new Token({
  $name: 'IfLogicalToken',
  validator: /^@if$/,
  startContexts: [() => ConditionLogicalContext, () => TemplateContext],
})
