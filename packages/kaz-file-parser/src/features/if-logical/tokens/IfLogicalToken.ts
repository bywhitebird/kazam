import { IfLogicalContext } from '..'
import { Token } from '../../../lib/voltair'
import { TemplateContext } from '../../template'

export const IfLogicalToken = new Token({
  $name: 'IfLogicalToken',
  validator: /^@if$/,
  startContexts: [() => IfLogicalContext, () => TemplateContext],
})
