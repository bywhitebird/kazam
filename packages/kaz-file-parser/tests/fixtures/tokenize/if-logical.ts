import { IfConditionToken, IfLeftParenthesisToken, IfLogicalToken, IfRightParenthesisToken } from '../../../src/features/if-logical'
import type { Token } from '../../../src/lib/voltair'
import { LeftCurlyBracketToken, RightCurlyBracketToken } from '../../../src/shared'

export const ifLogicalFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: Token
    rawValue?: string
    value?: unknown
  }[]
})[] = [
  {
    name: 'When I use a if logical, if logical is correctly tokenized',
    input: `
    @if (a == b) {
    }
    `,
    expectedTokenCheckers: [
      { checker: IfLogicalToken, rawValue: '@if' },
      { checker: IfLeftParenthesisToken, rawValue: '(' },
      { checker: IfConditionToken, value: 'a == b' },
      { checker: IfRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
  {
    name: 'When I use nested if logicals, if logical is correctly tokenized',
    input: `
    @if (a == b) {
      @if (c == d) {
      }
    }
    `,
    expectedTokenCheckers: [
      { checker: IfLogicalToken, rawValue: '@if' },
      { checker: IfLeftParenthesisToken, rawValue: '(' },
      { checker: IfConditionToken, rawValue: 'a == b' },
      { checker: IfRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: IfLogicalToken, rawValue: '@if' },
      { checker: IfLeftParenthesisToken, rawValue: '(' },
      { checker: IfConditionToken, rawValue: 'c == d' },
      { checker: IfRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
]
