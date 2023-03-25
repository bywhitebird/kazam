import { EndInstructionToken, StartInstructionToken } from '../../../src/features/instruction'
import { StateInstructionToken } from '../../../src/features/state-instruction'
import type { Token } from '../../../src/lib/voltair'
import { ColonTypeAnnotationToken, EqualVariableDeclarationToken, ExpressionToken, IdentifierToken, TypeToken } from '../../../src/shared'

export const stateInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: Token
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
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: StateInstructionToken, rawValue: 'state' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a state instruction with a type, state is correctly tokenized',
    input: `
    - state foo: string
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: StateInstructionToken, rawValue: 'state' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: ColonTypeAnnotationToken, rawValue: ':' },
      { checker: TypeToken, value: 'string' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a state instruction with a default value, state is correctly tokenized',
    input: `
    - state foo = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: StateInstructionToken, rawValue: 'state' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: EqualVariableDeclarationToken, rawValue: '=' },
      { checker: ExpressionToken, value: '\'bar\'' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a state instruction with a type and a default value, state is correctly tokenized',
    input: `
    - state foo: string = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: StateInstructionToken, rawValue: 'state' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: ColonTypeAnnotationToken, rawValue: ':' },
      { checker: TypeToken, value: 'string' },
      { checker: EqualVariableDeclarationToken, rawValue: '=' },
      { checker: ExpressionToken, value: '\'bar\'' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
]
