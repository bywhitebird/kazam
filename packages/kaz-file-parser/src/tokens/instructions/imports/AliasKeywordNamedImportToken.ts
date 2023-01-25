import { type Token, createToken } from '../../../classes/Token'
import { ImportInstructionContext } from '../../../contexts/instructions/imports/ImportInstructionContext'

export const AliasKeywordNamedImportToken = createToken({
  $name: 'AliasKeywordNamedImportToken',
  pattern: /^as$/,
  inContexts: [ImportInstructionContext],
})

export const isAliasKeywordNamedImportToken = (token: Token): token is typeof AliasKeywordNamedImportToken => token.$name === AliasKeywordNamedImportToken.$name
