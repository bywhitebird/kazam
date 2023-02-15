import { ImportInstructionContext } from '../../../contexts/instructions/ImportInstructionContext'
import { type Token, createToken } from '../../../lib/voltair'

export const WildcardCharacterImportToken = createToken({
  $name: 'WildcardCharacterImportToken',
  validator: /^\*$/,
  inContexts: [ImportInstructionContext],
})

export const isWildcardCharacterImportToken = (token: Token): token is typeof WildcardCharacterImportToken => token.$name === WildcardCharacterImportToken.$name
