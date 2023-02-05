import { type Token, createToken } from '../../classes/Token'
import { ExpressionContext } from '../../contexts/ExpressionContext'

export const DeclarationValueEqualToken = createToken({
  $name: 'DeclarationValueEqualToken',
  validator: /^=$/,
  singleCharacter: true,
  startContexts: [ExpressionContext],
})

export const isDeclarationValueEqualToken = (token: Token): token is typeof DeclarationValueEqualToken => token.$name === DeclarationValueEqualToken.$name
