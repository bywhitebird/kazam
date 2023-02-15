import * as Tokens from './tokens'

export const orderedTokens = [
  Tokens.StartInstructionToken,
  Tokens.EndInstructionToken,

  Tokens.ImportInstructionToken,
  Tokens.FromKeywordImportToken,
  Tokens.AliasKeywordNamedImportToken,
  Tokens.WildcardCharacterImportToken,

  Tokens.PropInstructionToken,

  Tokens.StateInstructionToken,

  Tokens.ComputedInstructionToken,

  Tokens.DeclarationTypeColonToken,
  Tokens.DeclarationValueEqualToken,

  Tokens.LeftCurlyBracketToken,
  Tokens.RightCurlyBracketToken,

  Tokens.SingleQuoteToken,
  Tokens.DoubleQuoteToken,

  Tokens.SingleQuotedStringToken,
  Tokens.DoubleQuotedStringToken,

  Tokens.CommaToken,
  Tokens.IdentifierToken,

  Tokens.TypeToken,
  Tokens.ExpressionToken,

  Tokens.WhitespaceToken,
  Tokens.TextToken,
]

if (Object.keys(Tokens).length !== orderedTokens.length)
  throw new Error('Tokens must have unique names')
