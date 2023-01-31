import { g } from '../../../../classes/groups/Group'
import { gp } from '../../../../classes/groups/GroupParent'
import { s } from '../../../../classes/Sequence'
import * as Tokens from '../../../../tokens'

export const DefaultImportSpecifierSequence = gp(
  'DefaultImport',
  s(
    g('name', Tokens.IdentifierToken),
  ),
)
