import type { Token } from '../../../src/lib/voltair'
import { isExpressionToken } from '../../../src/tokens/ExpressionToken'
import { isIdentifierToken } from '../../../src/tokens/IdentifierToken'
import { isDeclarationTypeColonToken } from '../../../src/tokens/instructions/DeclarationTypeColonToken'
import { isDeclarationValueEqualToken } from '../../../src/tokens/instructions/DeclarationValueEqualToken'
import { isEndInstructionToken } from '../../../src/tokens/instructions/EndInstructionToken'
import { isStartInstructionToken } from '../../../src/tokens/instructions/StartInstructionToken'
import { isStateInstructionToken } from '../../../src/tokens/instructions/state/StateInstructionToken'
import { isTypeToken } from '../../../src/tokens/ts/TypeToken'

export const stateInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: (token: Token) => boolean
    rawValue?: string
    value?: unknown
  }[]
})[] = [
  {
    name: 'When I use a state instruction, state is correctly tokenized',
    input: `
    - state foo
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isStateInstructionToken, rawValue: 'state' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a state instruction with a type, state is correctly tokenized',
    input: `
    - state foo: string
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isStateInstructionToken, rawValue: 'state' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isDeclarationTypeColonToken, rawValue: ':' },
      { checker: isTypeToken, value: 'string' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a state instruction with a default value, state is correctly tokenized',
    input: `
    - state foo = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isStateInstructionToken, rawValue: 'state' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isDeclarationValueEqualToken, rawValue: '=' },
      { checker: isExpressionToken, value: '\'bar\'' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a state instruction with a type and a default value, state is correctly tokenized',
    input: `
    - state foo: string = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isStateInstructionToken, rawValue: 'state' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isDeclarationTypeColonToken, rawValue: ':' },
      { checker: isTypeToken, value: 'string' },
      { checker: isDeclarationValueEqualToken, rawValue: '=' },
      { checker: isExpressionToken, value: '\'bar\'' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
]
