import * as Tokens from '../../../../tokens'
import { createSequence as s } from '../../../utils/create-sequence'

export const NamespaceImportSpecifierSequence = s(
  Tokens.WildcardCharacterImportToken,
  Tokens.AliasKeywordNamedImportToken,
  Tokens.IdentifierToken,
)
