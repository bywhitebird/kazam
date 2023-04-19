import { ConditionLogicalContext } from '..'
import { Token } from '../../../lib/voltair'

export const IfRightParenthesisToken = new Token({
  $name: 'IfRightParenthesis',
  validator: /^\)$/,
  singleCharacter: true,
  inContexts: [() => ConditionLogicalContext],
})
