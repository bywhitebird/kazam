import { AliasKeywordToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { CommaToken, IdentifierToken, LeftCurlyBracketToken, RightCurlyBracketToken } from '../../../shared'

const NamedImportIdentifierSequence = gp(
  'NamedImport',
  s(
    g('name', IdentifierToken),
    s(
      AliasKeywordToken,
      g('alias', IdentifierToken),
      { optional: true },
    ),
  ),
)

export const NamedImportSpecifierSequence = s(
  LeftCurlyBracketToken,
  NamedImportIdentifierSequence,
  s(
    s(
      CommaToken,
      NamedImportIdentifierSequence,
      { min: 0 },
    ),
    { optional: true },
  ),
  s(CommaToken, { optional: true }),
  RightCurlyBracketToken,
)
