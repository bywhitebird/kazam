import { ComputedInstructionToken } from './features/computed-instruction'
import { ElseIfLogicalToken, ElseLogicalToken, IfConditionToken, IfLeftParenthesisToken, IfLogicalToken, IfRightParenthesisToken } from './features/condition-logical'
import { ForLeftParenthesisToken, ForLogicalToken, ForParametersToken, ForRightParenthesisToken } from './features/for-logical'
import { AliasKeywordToken, FromKeywordToken, ImportInstructionToken, WildcardCharacterToken } from './features/import-instruction'
import { EndInstructionToken, StartInstructionToken } from './features/instruction'
import { KazSequence } from './features/kaz'
import { LifecycleInstructionToken } from './features/lifecycle-instruction'
import { PropInstructionToken } from './features/prop-instruction'
import { StateInstructionToken } from './features/state-instruction'
import { TagAttributeEqualToken, TagAttributeLeftCurlyBracketToken, TagAttributeNameToken, TagAttributeRightCurlyBracketToken, TagAttributeSeparatorToken, TagEventAttributeNameToken, TagLeftParenthesisToken, TagNameOrTextToken, TagRightParenthesisToken } from './features/tag'
import { TemplateExpressionEndToken, TemplateExpressionLeftCurlyToken, TemplateExpressionStartToken } from './features/template'
import { WatchInstructionToken } from './features/watch-instruction'
import { ArrowFunctionBodyToken, ArrowToken, ColonToken, ColonTypeAnnotationToken, CommaToken, DoubleQuoteToken, DoubleQuotedStringToken, EqualToken, EqualVariableDeclarationToken, ExpressionToken, IdentifierToken, LeftCurlyBracketToken, LeftParenthesisToken, RightCurlyBracketToken, RightParenthesisToken, SingleQuoteToken, SingleQuotedStringToken, TextToken, TypeToken, WhitespaceToken } from './shared'

export default {
  entry: KazSequence,
  defaultBreakingPatterns: [/\s+/, /^\($/],
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
        // Lifecycle instruction
        LifecycleInstructionToken,
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
      // Conditional logical
      IfLogicalToken,
      ElseIfLogicalToken,
      ElseLogicalToken,

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
      // Template expression
      TemplateExpressionStartToken,
      TemplateExpressionLeftCurlyToken,
      TemplateExpressionEndToken,
    ],

    [
      [
        // Tag parenthesis
        TagLeftParenthesisToken,
        TagRightParenthesisToken,
      ],

      [
        // Tag attributes
        TagEventAttributeNameToken,
        TagAttributeNameToken,
        TagAttributeSeparatorToken,

        TagAttributeEqualToken,

        [
          // Tag attribute value expression
          TagAttributeLeftCurlyBracketToken,
          TagAttributeRightCurlyBracketToken,
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
    TagNameOrTextToken,
    IdentifierToken,
    TypeToken,
    ExpressionToken,
    ArrowFunctionBodyToken,
    WhitespaceToken,
    TextToken,
  ].flat(Number.POSITIVE_INFINITY as 9999),
}
