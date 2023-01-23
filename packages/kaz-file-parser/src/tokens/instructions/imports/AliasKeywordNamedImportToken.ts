import { ImportInstructionContext } from '../../../contexts/instructions/imports/ImportInstructionContext'
import type { Token } from '../../../types/Token'
import { createToken } from '../../utils/create-token'

export const AliasKeywordNamedImportToken = createToken({
  $name: 'AliasKeywordNamedImportToken',
  $rawValue: '',
  $index: 0,
  pattern: /^as$/,
  inContexts: [ImportInstructionContext],
})

export const isAliasKeywordNamedImportToken = (token: Token): token is typeof AliasKeywordNamedImportToken => token.$name === AliasKeywordNamedImportToken.$name
