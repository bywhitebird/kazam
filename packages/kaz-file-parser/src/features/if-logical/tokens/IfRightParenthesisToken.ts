import { IfLogicalContext } from '..'
import { RightParenthesisToken } from '../../../shared'

export const IfRightParenthesisToken = RightParenthesisToken.extends({
  $name: 'IfRightParenthesis',
  inContexts: [() => IfLogicalContext],
})
