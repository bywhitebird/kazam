import { type Token, createToken } from '../../../classes/Token'
import { ImportInstructionContext } from '../../../contexts/instructions/imports/ImportInstructionContext'

export const WildcardCharacterImportToken = createToken({
  $name: 'WildcardCharacterImportToken',
  validator: /^\*$/,
  inContexts: [ImportInstructionContext],
})

export const isWildcardCharacterImportToken = (token: Token): token is typeof WildcardCharacterImportToken => token.$name === WildcardCharacterImportToken.$name
