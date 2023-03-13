import { ComputedInstructionToken } from './features/computed-instruction'
import { EventInstructionToken } from './features/event-instruction'
import { ForLeftParenthesisToken, ForLogicalToken, ForParametersToken, ForRightParenthesisToken } from './features/for-logical'
import { IfConditionToken, IfLeftParenthesisToken, IfLogicalToken, IfRightParenthesisToken } from './features/if-logical'
import { AliasKeywordToken, FromKeywordToken, ImportInstructionToken, WildcardCharacterToken } from './features/import-instruction'
import { EndInstructionToken, StartInstructionToken } from './features/instruction'
import { KazSequence } from './features/kaz'
import { PropInstructionToken } from './features/prop-instruction'
import { StateInstructionToken } from './features/state-instruction'
import { WatchInstructionToken } from './features/watch-instruction'
import { ArrowFunctionBodyToken, ArrowToken, ColonToken, ColonTypeAnnotationToken, CommaToken, DoubleQuoteToken, DoubleQuotedStringToken, EqualToken, EqualVariableDeclarationToken, ExpressionToken, IdentifierToken, LeftCurlyBracketToken, LeftParenthesisToken, RightCurlyBracketToken, RightParenthesisToken, SingleQuoteToken, SingleQuotedStringToken, TextToken, TypeToken, WhitespaceToken } from './shared'

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

      [
        // Event instruction
        EventInstructionToken,
      ],

      EndInstructionToken,
    ],

    [
      // For logical
      ForLogicalToken,

      [
        // For parameters
        ForParametersToken,

        [
          // For parenthesis
          ForLeftParenthesisToken,
          ForRightParenthesisToken,
        ],
      ],
    ],

    [
      // If logical
      IfLogicalToken,

      [
        // If parameters
        IfConditionToken,

        [
          // If parenthesis
          IfLeftParenthesisToken,
          IfRightParenthesisToken,
        ],
      ],
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
