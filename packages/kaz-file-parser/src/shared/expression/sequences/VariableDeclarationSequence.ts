import { EqualVariableDeclarationToken, ExpressionToken } from '..'
import { gv, s } from '../../../lib/voltair'

export const VariableDeclarationSequence = s(
  EqualVariableDeclarationToken,
  gv(ExpressionToken),
)
