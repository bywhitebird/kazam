import { Token } from '../../../lib/voltair'
import { TemplateContext } from '../../template'
import { TagContext } from '../contexts/TagContext'

export const TagNameOrTextToken = new Token({
  $name: 'TagNameOrTextToken',
  // validator: /^[a-zA-Z_$][a-zA-Z_$0-9]*$/,
  validator: /^[^\s]+$/,
  getValue: rawValue => rawValue,
  startContexts: [() => TagContext, () => TemplateContext],
})
