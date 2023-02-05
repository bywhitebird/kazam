import type { Token } from '../../../src/classes/Token'
import { isExpressionToken } from '../../../src/tokens/ExpressionToken'
import { isIdentifierToken } from '../../../src/tokens/IdentifierToken'
import { isDeclarationTypeColonToken } from '../../../src/tokens/instructions/DeclarationTypeColonToken'
import { isDeclarationValueEqualToken } from '../../../src/tokens/instructions/DeclarationValueEqualToken'
import { isEndInstructionToken } from '../../../src/tokens/instructions/EndInstructionToken'
import { isPropInstructionToken } from '../../../src/tokens/instructions/prop/PropInstructionToken'
import { isStartInstructionToken } from '../../../src/tokens/instructions/StartInstructionToken'
import { isTypeToken } from '../../../src/tokens/ts/TypeToken'

export const propInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: (token: Token) => boolean
    rawValue?: string
    value?: unknown
  }[]
})[] = [
  {
    name: 'When I use a prop instruction, prop is correctly tokenized',
    input: `
    - prop foo
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isPropInstructionToken, rawValue: 'prop' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a prop instruction with a type, prop is correctly tokenized',
    input: `
    - prop foo: string
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isPropInstructionToken, rawValue: 'prop' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isDeclarationTypeColonToken, rawValue: ':' },
      { checker: isTypeToken, value: 'string' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a prop instruction with a default value, prop is correctly tokenized',
    input: `
    - prop foo = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isPropInstructionToken, rawValue: 'prop' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isDeclarationValueEqualToken, rawValue: '=' },
      { checker: isExpressionToken, value: '\'bar\'' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a prop instruction with a type and a default value, prop is correctly tokenized',
    input: `
    - prop foo: string = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isPropInstructionToken, rawValue: 'prop' },
      { checker: isIdentifierToken, rawValue: 'foo' },
      { checker: isDeclarationTypeColonToken, rawValue: ':' },
      { checker: isTypeToken, value: 'string' },
      { checker: isDeclarationValueEqualToken, rawValue: '=' },
      { checker: isExpressionToken, value: '\'bar\'' },
      { checker: isEndInstructionToken, rawValue: '' },
    ],
  },
]
