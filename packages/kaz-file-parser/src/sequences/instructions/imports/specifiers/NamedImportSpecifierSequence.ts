import * as Tokens from '../../../../tokens'
import { createSequence as s } from '../../../utils/create-sequence'

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
