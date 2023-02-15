import { ExpressionContext } from '../../contexts/ExpressionContext'
import { type Token, createToken } from '../../lib/voltair'

export const DeclarationValueEqualToken = createToken({
  $name: 'DeclarationValueEqualToken',
  validator: /^=$/,
  singleCharacter: true,
  startContexts: [ExpressionContext],
})

export const isDeclarationValueEqualToken = (token: Token): token is typeof DeclarationValueEqualToken => token.$name === DeclarationValueEqualToken.$name
