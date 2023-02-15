import { g, gp, s } from '../../../../lib/voltair'
import * as Tokens from '../../../../tokens'

export const DefaultImportSpecifierSequence = gp(
  'DefaultImport',
  s(
    g('name', Tokens.IdentifierToken),
  ),
)
