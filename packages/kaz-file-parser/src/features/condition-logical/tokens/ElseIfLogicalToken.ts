import { ConditionLogicalContext } from '..'
import { Token } from '../../../lib/voltair'
import { TemplateContext } from '../../template'

export const ElseIfLogicalToken = new Token({
  $name: 'ElseIfLogicalToken',
  validator: /^if$/,
  startContexts: [() => ConditionLogicalContext, () => TemplateContext],
})
