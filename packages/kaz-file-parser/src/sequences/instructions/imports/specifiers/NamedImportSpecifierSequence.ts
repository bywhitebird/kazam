import { s } from '../../../../classes/Sequence'
import * as Tokens from '../../../../tokens'

const NamedImportIdentifierSequence = s(
  Tokens.IdentifierToken,
  s(
    Tokens.AliasKeywordNamedImportToken,
    Tokens.IdentifierToken,
    { optional: true },
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
