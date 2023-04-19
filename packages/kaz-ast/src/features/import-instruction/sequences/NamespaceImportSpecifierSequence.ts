import { AliasKeywordToken, WildcardCharacterToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { IdentifierToken } from '../../../shared'

export const NamespaceImportSpecifierSequence = gp(
  'NamespaceImport',
  s(
    WildcardCharacterToken,
    AliasKeywordToken,
    g('name', IdentifierToken),
  ),
)
