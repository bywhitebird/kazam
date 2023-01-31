import { g } from '../../../../classes/groups/Group'
import { gp } from '../../../../classes/groups/GroupParent'
import { s } from '../../../../classes/Sequence'
import * as Tokens from '../../../../tokens'

export const NamespaceImportSpecifierSequence = gp(
  'NamespaceImport',
  s(
    Tokens.WildcardCharacterImportToken,
    Tokens.AliasKeywordNamedImportToken,
    g('name', Tokens.IdentifierToken),
  ),
)
