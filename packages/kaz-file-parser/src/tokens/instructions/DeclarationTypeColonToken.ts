import { type Token, createToken } from '../../classes/Token'
import { TypeContext } from '../../contexts/TypeContext'

export const DeclarationTypeColonToken = createToken({
  $name: 'TypeDeclarationColonToken',
  validator: /^:$/,
  singleCharacter: true,
  startContexts: [TypeContext],
})

export const isDeclarationTypeColonToken = (token: Token): token is typeof DeclarationTypeColonToken => token.$name === DeclarationTypeColonToken.$name
