import { ForLogicalContext } from '..'
import { RightParenthesisToken } from '../../../shared'

export const ForRightParenthesisToken = RightParenthesisToken.extends({
  $name: 'ForRightParenthesis',
  inContexts: [() => ForLogicalContext],
})
