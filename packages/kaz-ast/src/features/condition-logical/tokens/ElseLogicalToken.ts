import { ConditionLogicalContext } from '..'
import { Token } from '../../../lib/voltair'
import { TemplateContext } from '../../template'

export const ElseLogicalToken = new Token({
  $name: 'ElseLogicalToken',
  validator: /^@else$/,
  startContexts: [() => ConditionLogicalContext, () => TemplateContext],
  semantic: {
    type: 'keyword',
  },
})
