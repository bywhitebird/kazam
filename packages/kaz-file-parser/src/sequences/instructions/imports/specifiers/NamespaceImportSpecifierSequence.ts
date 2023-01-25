import { s } from '../../../../classes/Sequence'
import * as Tokens from '../../../../tokens'

export const NamespaceImportSpecifierSequence = s(
  Tokens.WildcardCharacterImportToken,
  Tokens.AliasKeywordNamedImportToken,
  Tokens.IdentifierToken,
)
