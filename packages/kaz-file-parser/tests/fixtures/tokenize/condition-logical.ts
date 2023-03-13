import { ElseIfLogicalToken, ElseLogicalToken, IfConditionToken, IfLeftParenthesisToken, IfLogicalToken, IfRightParenthesisToken } from '../../../src/features/condition-logical'
import type { Token } from '../../../src/lib/voltair'
import { LeftCurlyBracketToken, RightCurlyBracketToken } from '../../../src/shared'

export const conditionLogicalFixtures: ({
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
    name: 'When I use a if logical with else logical, if logical is correctly tokenized',
    input: `
    @if (a == b) {
    } @else {
    }
    `,
    expectedTokenCheckers: [
      { checker: IfLogicalToken, rawValue: '@if' },
      { checker: IfLeftParenthesisToken, rawValue: '(' },
      { checker: IfConditionToken, value: 'a == b' },
      { checker: IfRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: ElseLogicalToken, rawValue: '@else' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
  {
    name: 'When I use a if logical with else if logical, if logical is correctly tokenized',
    input: `
    @if (a == b) {
    } @else if (c == d) {
    }
    `,
    expectedTokenCheckers: [
      { checker: IfLogicalToken, rawValue: '@if' },
      { checker: IfLeftParenthesisToken, rawValue: '(' },
      { checker: IfConditionToken, value: 'a == b' },
      { checker: IfRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: ElseLogicalToken, rawValue: '@else' },
      { checker: ElseIfLogicalToken, rawValue: 'if' },
      { checker: IfLeftParenthesisToken, rawValue: '(' },
      { checker: IfConditionToken, value: 'c == d' },
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
  {
    name: 'When I use a if logical instruction with multiple else if with else logical instruction and nested if logical instruction, if logical is validated',
    input: `
    @if (a == b) {
      @if (b == c) {
      }
      @if (i == j) {
      }
    } @else if (c == d) {
      @if (e == f) {
      }
      @else {
      }
    } @else {
      @if (i == j) {
      }
      @else if (k == l) {
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
      { checker: IfConditionToken, rawValue: 'b == c' },
      { checker: IfRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: IfLogicalToken, rawValue: '@if' },
      { checker: IfLeftParenthesisToken, rawValue: '(' },
      { checker: IfConditionToken, rawValue: 'i == j' },
      { checker: IfRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: ElseLogicalToken, rawValue: '@else' },
      { checker: ElseIfLogicalToken, rawValue: 'if' },
      { checker: IfLeftParenthesisToken, rawValue: '(' },
      { checker: IfConditionToken, rawValue: 'c == d' },
      { checker: IfRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: IfLogicalToken, rawValue: '@if' },
      { checker: IfLeftParenthesisToken, rawValue: '(' },
      { checker: IfConditionToken, rawValue: 'e == f' },
      { checker: IfRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: ElseLogicalToken, rawValue: '@else' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: ElseLogicalToken, rawValue: '@else' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: IfLogicalToken, rawValue: '@if' },
      { checker: IfLeftParenthesisToken, rawValue: '(' },
      { checker: IfConditionToken, rawValue: 'i == j' },
      { checker: IfRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: ElseLogicalToken, rawValue: '@else' },
      { checker: ElseIfLogicalToken, rawValue: 'if' },
      { checker: IfLeftParenthesisToken, rawValue: '(' },
      { checker: IfConditionToken, rawValue: 'k == l' },
      { checker: IfRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
]
