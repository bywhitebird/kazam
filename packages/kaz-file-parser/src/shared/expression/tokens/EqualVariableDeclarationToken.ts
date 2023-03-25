import { ExpressionContext } from '..'
import { EqualToken } from '../..'

export const EqualVariableDeclarationToken = EqualToken.extends({
  $name: 'EqualVariableDeclarationToken',
  startContexts: [() => ExpressionContext],
})
