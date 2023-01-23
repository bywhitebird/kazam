import { ImportInstructionContext } from '../../../contexts/instructions/imports/ImportInstructionContext'
import type { Token } from '../../../types/Token'
import { createToken } from '../../utils/create-token'

export const WildcardCharacterImportToken = createToken({
  $name: 'WildcardCharacterImportToken',
  $rawValue: '',
  $index: 0,
  pattern: /^\*$/,
  inContexts: [ImportInstructionContext],
})

export const isWildcardCharacterImportToken = (token: Token): token is typeof WildcardCharacterImportToken => token.$name === WildcardCharacterImportToken.$name
