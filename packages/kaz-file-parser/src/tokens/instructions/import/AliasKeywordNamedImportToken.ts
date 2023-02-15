import { ImportInstructionContext } from '../../../contexts/instructions/ImportInstructionContext'
import { type Token, createToken } from '../../../lib/voltair'

export const AliasKeywordNamedImportToken = createToken({
  $name: 'AliasKeywordNamedImportToken',
  validator: /^as$/,
  inContexts: [ImportInstructionContext],
})

export const isAliasKeywordNamedImportToken = (token: Token): token is typeof AliasKeywordNamedImportToken => token.$name === AliasKeywordNamedImportToken.$name
