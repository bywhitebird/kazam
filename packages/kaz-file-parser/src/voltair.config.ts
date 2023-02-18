import { ComputedInstructionToken } from './features/computed-instruction'
import { AliasKeywordToken, FromKeywordToken, ImportInstructionToken, WildcardCharacterToken } from './features/import-instruction'
import { EndInstructionToken, StartInstructionToken } from './features/instruction'
import { KazSequence } from './features/kaz'
import { PropInstructionToken } from './features/prop-instruction'
import { StateInstructionToken } from './features/state-instruction'
import { ArrowFunctionBodyToken, WatchInstructionToken } from './features/watch-instruction'
import { ArrowToken, ColonToken, ColonTypeAnnotationToken, CommaToken, DoubleQuoteToken, DoubleQuotedStringToken, EqualToken, EqualVariableDeclarationToken, ExpressionToken, IdentifierToken, LeftCurlyBracketToken, LeftParenthesisToken, RightCurlyBracketToken, RightParenthesisToken, SingleQuoteToken, SingleQuotedStringToken, TextToken, TypeToken, WhitespaceToken } from './shared'

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

      [
        // Watch instruction
        WatchInstructionToken,
      ],

      EndInstructionToken,
    ],

    [
      // Colons
      ColonTypeAnnotationToken,
      ColonToken,
    ],

    [
      // Arrow
      ArrowToken,
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
      // Parentheses
      LeftParenthesisToken,
      RightParenthesisToken,
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
    ArrowFunctionBodyToken,
    WhitespaceToken,
    TextToken,
  ].flat(Infinity as 9999),
}
