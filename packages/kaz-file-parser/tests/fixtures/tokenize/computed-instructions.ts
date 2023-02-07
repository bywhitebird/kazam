import type { Token } from '../../../src/classes/Token'
import { isExpressionToken } from '../../../src/tokens/ExpressionToken'
import { isIdentifierToken } from '../../../src/tokens/IdentifierToken'
import { isComputedInstructionToken } from '../../../src/tokens/instructions/computed/ComputedInstructionToken'
import { isDeclarationTypeColonToken } from '../../../src/tokens/instructions/DeclarationTypeColonToken'
import { isDeclarationValueEqualToken } from '../../../src/tokens/instructions/DeclarationValueEqualToken'
import { isEndInstructionToken } from '../../../src/tokens/instructions/EndInstructionToken'
import { isStartInstructionToken } from '../../../src/tokens/instructions/StartInstructionToken'
import { isTypeToken } from '../../../src/tokens/ts/TypeToken'

export const computedInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: (token: Token) => boolean
    rawValue?: string
    value?: unknown
  }[]
})[] = [
  {
    name: 'When I use a computed instruction, computed is correctly tokenized',
    input: `
    - computed foo
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isComputedInstructionToken, rawValue: 'computed' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a computed instruction with a type, computed is correctly tokenized',
    input: `
    - computed foo: string
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isComputedInstructionToken, rawValue: 'computed' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isDeclarationTypeColonToken, rawValue: ':' },
      { checker: isTypeToken, value: 'string' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a computed instruction with a default value, computed is correctly tokenized',
    input: `
    - computed foo = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isComputedInstructionToken, rawValue: 'computed' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isDeclarationValueEqualToken, rawValue: '=' },
      { checker: isExpressionToken, value: '\'bar\'' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a computed instruction with a type and a default value, computed is correctly tokenized',
    input: `
    - computed foo: string = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isComputedInstructionToken, rawValue: 'computed' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isDeclarationTypeColonToken, rawValue: ':' },
      { checker: isTypeToken, value: 'string' },
      { checker: isDeclarationValueEqualToken, rawValue: '=' },
      { checker: isExpressionToken, value: '\'bar\'' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
]
