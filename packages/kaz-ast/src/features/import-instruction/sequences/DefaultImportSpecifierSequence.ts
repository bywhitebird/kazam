import { g, gp, s } from '../../../lib/voltair'
import { IdentifierToken } from '../../../shared'

export const DefaultImportSpecifierSequence = gp(
  'DefaultImport',
  s(
    g('name', IdentifierToken),
  ),
)
