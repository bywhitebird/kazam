import { g, gp, s } from '../../../../lib/voltair'
import * as Tokens from '../../../../tokens'

const NamedImportIdentifierSequence = gp(
  'NamedImport',
  s(
    g('name', Tokens.IdentifierToken),
    s(
      Tokens.AliasKeywordNamedImportToken,
      g('alias', Tokens.IdentifierToken),
      { optional: true },
    ),
  ),
)

export const NamedImportSpecifierSequence = s(
  Tokens.LeftCurlyBracketToken,
  NamedImportIdentifierSequence,
  s(
    s(
      Tokens.CommaToken,
      NamedImportIdentifierSequence,
      { min: 0 },
    ),
    { optional: true },
  ),
  s(Tokens.CommaToken, { optional: true }),
  Tokens.RightCurlyBracketToken,
)
