import { ForLogicalContext, ForParametersContext } from '..'
import { LeftParenthesisToken } from '../../../shared'

export const ForLeftParenthesisToken = LeftParenthesisToken.extends({
  $name: 'ForLeftParenthesis',
  startContexts: [() => ForParametersContext],
  inContexts: [() => ForLogicalContext],
})
