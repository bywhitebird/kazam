import { g, gp, s } from '../../../../lib/voltair'
import * as Tokens from '../../../../tokens'

export const NamespaceImportSpecifierSequence = gp(
  'NamespaceImport',
  s(
    Tokens.WildcardCharacterImportToken,
    Tokens.AliasKeywordNamedImportToken,
    g('name', Tokens.IdentifierToken),
  ),
)
