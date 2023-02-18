import { ComputedInstructionToken } from './features/computed-instruction'
import { AliasKeywordToken, FromKeywordToken, ImportInstructionToken, WildcardCharacterToken } from './features/import-instruction'
import { EndInstructionToken, StartInstructionToken } from './features/instruction'
import { KazSequence } from './features/kaz'
import { PropInstructionToken } from './features/prop-instruction'
import { StateInstructionToken } from './features/state-instruction'
import { ColonToken, ColonTypeAnnotationToken, CommaToken, DoubleQuoteToken, DoubleQuotedStringToken, EqualToken, EqualVariableDeclarationToken, ExpressionToken, IdentifierToken, LeftCurlyBracketToken, RightCurlyBracketToken, SingleQuoteToken, SingleQuotedStringToken, TextToken, TypeToken, WhitespaceToken } from './shared'

export default {
  entry: KazSequence,
  tokens: [
    [
      // Instruction
      StartInstructionToken,

      [
        // Import instruction
        ImportInstructionToken,
        FromKeywordToken,
        AliasKeywordToken,
        WildcardCharacterToken,
      ],

      [
        // Prop instruction
        PropInstructionToken,
      ],

      [
        // State instruction
        StateInstructionToken,
      ],

      [
        // Computed instruction
        ComputedInstructionToken,
      ],

      EndInstructionToken,
    ],

    [
      // Colons
      ColonTypeAnnotationToken,
      ColonToken,
    ],

    [
      // Equals
      EqualVariableDeclarationToken,
      EqualToken,
    ],

    [
      // Curly brackets
      LeftCurlyBracketToken,
      RightCurlyBracketToken,
    ],

    [
      // Strings
      [
        SingleQuoteToken,
        SingleQuotedStringToken,
      ],

      [
        DoubleQuoteToken,
        DoubleQuotedStringToken,
      ],
    ],

    // Other tokens
    CommaToken,
    IdentifierToken,
    TypeToken,
    ExpressionToken,
    WhitespaceToken,
    TextToken,
  ].flat(Infinity as 9999),
}
