import { ForLeftParenthesisToken, ForLogicalToken, ForParametersToken, ForRightParenthesisToken } from '../../../src/features/for-logical'
import type { Token } from '../../../src/lib/voltair'
import { LeftCurlyBracketToken, RightCurlyBracketToken } from '../../../src/shared'

export const forLogicalFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: Token
    rawValue?: string
    value?: unknown
  }[]
})[] = [
  {
    name: 'When I use a for logical, for logical is correctly tokenized',
    input: `
    @for (let i = 0; i < 10; i++) {
    }
    `,
    expectedTokenCheckers: [
      { checker: ForLogicalToken, rawValue: '@for' },
      { checker: ForLeftParenthesisToken, rawValue: '(' },
      { checker: ForParametersToken, rawValue: 'let i = 0; i < 10; i++' },
      { checker: ForRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
  {
    name: 'When I use nested for logicals, for logical is correctly tokenized',
    input: `
    @for (let i = 0; i < 10; i++) {
      @for (let j = 0; j < 10; j++) {
      }
    }
    `,
    expectedTokenCheckers: [
      { checker: ForLogicalToken, rawValue: '@for' },
      { checker: ForLeftParenthesisToken, rawValue: '(' },
      { checker: ForParametersToken, rawValue: 'let i = 0; i < 10; i++' },
      { checker: ForRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: ForLogicalToken, rawValue: '@for' },
      { checker: ForLeftParenthesisToken, rawValue: '(' },
      { checker: ForParametersToken, rawValue: 'let j = 0; j < 10; j++' },
      { checker: ForRightParenthesisToken, rawValue: ')' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
    ],
  },
]
