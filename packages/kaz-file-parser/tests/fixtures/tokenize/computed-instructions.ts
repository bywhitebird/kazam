import { ComputedInstructionToken } from '../../../src/features/computed-instruction'
import { EndInstructionToken, StartInstructionToken } from '../../../src/features/instruction'
import type { Token } from '../../../src/lib/voltair'
import { ColonTypeAnnotationToken, EqualVariableDeclarationToken, ExpressionToken, IdentifierToken, TypeToken } from '../../../src/shared'

export const computedInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: Token
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
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ComputedInstructionToken, rawValue: 'computed' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a computed instruction with a type, computed is correctly tokenized',
    input: `
    - computed foo: string
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ComputedInstructionToken, rawValue: 'computed' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: ColonTypeAnnotationToken, rawValue: ':' },
      { checker: TypeToken, value: 'string' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a computed instruction with a default value, computed is correctly tokenized',
    input: `
    - computed foo = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ComputedInstructionToken, rawValue: 'computed' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: EqualVariableDeclarationToken, rawValue: '=' },
      { checker: ExpressionToken, value: '\'bar\'' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a computed instruction with a type and a default value, computed is correctly tokenized',
    input: `
    - computed foo: string = 'bar'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ComputedInstructionToken, rawValue: 'computed' },
      { checker: IdentifierToken, rawValue: 'foo' },
      { checker: ColonTypeAnnotationToken, rawValue: ':' },
      { checker: TypeToken, value: 'string' },
      { checker: EqualVariableDeclarationToken, rawValue: '=' },
      { checker: ExpressionToken, value: '\'bar\'' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
]
