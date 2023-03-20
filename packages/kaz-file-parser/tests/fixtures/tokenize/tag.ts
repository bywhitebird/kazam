import { TagAttributeEqualToken, TagAttributeLeftCurlyBracketToken, TagAttributeNameToken, TagAttributeRightCurlyBracketToken, TagAttributeSeparatorToken, TagLeftParenthesisToken, TagNameOrTextToken, TagRightParenthesisToken } from '../../../src/features/tag'
import type { Token } from '../../../src/lib/voltair'
import { DoubleQuoteToken, DoubleQuotedStringToken, ExpressionToken, LeftCurlyBracketToken, RightCurlyBracketToken } from '../../../src/shared'

export const tagFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: Token
    rawValue?: string
    value?: unknown
  }[]
})[] = [
  {
    name: 'When I use a tag, tag is correctly tokenized',
    input: `
    p () {}
    `,
    expectedTokenCheckers: [
      { checker: TagNameOrTextToken, rawValue: 'p' },
      { checker: TagLeftParenthesisToken, rawValue: '(' },
      { checker: TagRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
  {
    name: 'When I use a tag with string attribute, tag is correctly tokenized',
    input: `
    p (a = "b") {}
    `,
    expectedTokenCheckers: [
      { checker: TagNameOrTextToken, rawValue: 'p' },
      { checker: TagLeftParenthesisToken, rawValue: '(' },
      { checker: TagAttributeNameToken, rawValue: 'a' },
      { checker: TagAttributeEqualToken, rawValue: '=' },
      { checker: DoubleQuoteToken, rawValue: '"' },
      { checker: DoubleQuotedStringToken, value: 'b' },
      { checker: DoubleQuoteToken, rawValue: '"' },
      { checker: TagRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
  {
    name: 'When I use a tag with boolean attribute, tag is correctly tokenized',
    input: `
    p (a) {}
    `,
    expectedTokenCheckers: [
      { checker: TagNameOrTextToken, rawValue: 'p' },
      { checker: TagLeftParenthesisToken, rawValue: '(' },
      { checker: TagAttributeNameToken, rawValue: 'a' },
      { checker: TagRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
  {
    name: 'When I use a tag with expression attribute, tag is correctly tokenized',
    input: `
    p (a = {b}) {}
    `,
    expectedTokenCheckers: [
      { checker: TagNameOrTextToken, rawValue: 'p' },
      { checker: TagLeftParenthesisToken, rawValue: '(' },
      { checker: TagAttributeNameToken, rawValue: 'a' },
      { checker: TagAttributeEqualToken, rawValue: '=' },
      { checker: TagAttributeLeftCurlyBracketToken, rawValue: '{' },
      { checker: ExpressionToken, value: 'b' },
      { checker: TagAttributeRightCurlyBracketToken, rawValue: '}' },
      { checker: TagRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
  {
    name: 'When I use a tag with multiple attributes, tag is correctly tokenized',
    input: `
    p (a = "b", c = {d}) {}
    `,
    expectedTokenCheckers: [
      { checker: TagNameOrTextToken, rawValue: 'p' },
      { checker: TagLeftParenthesisToken, rawValue: '(' },
      { checker: TagAttributeNameToken, rawValue: 'a' },
      { checker: TagAttributeEqualToken, rawValue: '=' },
      { checker: DoubleQuoteToken, rawValue: '"' },
      { checker: DoubleQuotedStringToken, value: 'b' },
      { checker: DoubleQuoteToken, rawValue: '"' },
      { checker: TagAttributeSeparatorToken, rawValue: ',' },
      { checker: TagAttributeNameToken, rawValue: 'c' },
      { checker: TagAttributeEqualToken, rawValue: '=' },
      { checker: TagAttributeLeftCurlyBracketToken, rawValue: '{' },
      { checker: ExpressionToken, value: 'd' },
      { checker: TagAttributeRightCurlyBracketToken, rawValue: '}' },
      { checker: TagRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
  {
    name: 'When I use a tag with children, tag is correctly tokenized',
    input: `
    p (a = "b", c = {d}) {
      a ()
    }
    `,
    expectedTokenCheckers: [
      { checker: TagNameOrTextToken, rawValue: 'p' },
      { checker: TagLeftParenthesisToken, rawValue: '(' },
      { checker: TagAttributeNameToken, rawValue: 'a' },
      { checker: TagAttributeEqualToken, rawValue: '=' },
      { checker: DoubleQuoteToken, rawValue: '"' },
      { checker: DoubleQuotedStringToken, value: 'b' },
      { checker: DoubleQuoteToken, rawValue: '"' },
      { checker: TagAttributeSeparatorToken, rawValue: ',' },
      { checker: TagAttributeNameToken, rawValue: 'c' },
      { checker: TagAttributeEqualToken, rawValue: '=' },
      { checker: TagAttributeLeftCurlyBracketToken, rawValue: '{' },
      { checker: ExpressionToken, value: 'd' },
      { checker: TagAttributeRightCurlyBracketToken, rawValue: '}' },
      { checker: TagRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: TagNameOrTextToken, rawValue: 'a' },
      { checker: TagLeftParenthesisToken, rawValue: '(' },
      { checker: TagRightParenthesisToken, rawValue: ')' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
  {
    name: 'When I use a tag with children, attributes and text, tag is correctly tokenized',
    input: `
    p (a = "b", c = {d}) {
      a () {
        Hello world
      }
    }
    `,
    expectedTokenCheckers: [
      { checker: TagNameOrTextToken, rawValue: 'p' },
      { checker: TagLeftParenthesisToken, rawValue: '(' },
      { checker: TagAttributeNameToken, rawValue: 'a' },
      { checker: TagAttributeEqualToken, rawValue: '=' },
      { checker: DoubleQuoteToken, rawValue: '"' },
      { checker: DoubleQuotedStringToken, value: 'b' },
      { checker: DoubleQuoteToken, rawValue: '"' },
      { checker: TagAttributeSeparatorToken, rawValue: ',' },
      { checker: TagAttributeNameToken, rawValue: 'c' },
      { checker: TagAttributeEqualToken, rawValue: '=' },
      { checker: TagAttributeLeftCurlyBracketToken, rawValue: '{' },
      { checker: ExpressionToken, value: 'd' },
      { checker: TagAttributeRightCurlyBracketToken, rawValue: '}' },
      { checker: TagRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: TagNameOrTextToken, rawValue: 'a' },
      { checker: TagLeftParenthesisToken, rawValue: '(' },
      { checker: TagRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: TagNameOrTextToken, value: 'Hello' },
      { checker: TagNameOrTextToken, value: 'world' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
]
