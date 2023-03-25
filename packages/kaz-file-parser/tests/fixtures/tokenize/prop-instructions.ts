import { EndInstructionToken, StartInstructionToken } from '../../../src/features/instruction'
import { PropInstructionToken } from '../../../src/features/prop-instruction'
import type { Token } from '../../../src/lib/voltair'
import { ColonTypeAnnotationToken, EqualVariableDeclarationToken, ExpressionToken, IdentifierToken, TypeToken } from '../../../src/shared'

export const propInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: Token
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
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: PropInstructionToken, rawValue: 'prop' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a prop instruction with a type, prop is correctly tokenized',
    input: `
    - prop foo: string
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: PropInstructionToken, rawValue: 'prop' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: ColonTypeAnnotationToken, rawValue: ':' },
      { checker: TypeToken, value: 'string' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a prop instruction with a default value, prop is correctly tokenized',
    input: `
    - prop foo = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: PropInstructionToken, rawValue: 'prop' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: EqualVariableDeclarationToken, rawValue: '=' },
      { checker: ExpressionToken, value: '\'bar\'' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a prop instruction with a type and a default value, prop is correctly tokenized',
    input: `
    - prop foo: string = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: PropInstructionToken, rawValue: 'prop' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: ColonTypeAnnotationToken, rawValue: ':' },
      { checker: TypeToken, value: 'string' },
      { checker: EqualVariableDeclarationToken, rawValue: '=' },
      { checker: ExpressionToken, value: '\'bar\'' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
]
