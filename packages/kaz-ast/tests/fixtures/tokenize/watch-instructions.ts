import { EndInstructionToken, StartInstructionToken } from '../../../src/features/instruction'
import { WatchInstructionToken } from '../../../src/features/watch-instruction'
import type { Token } from '../../../src/lib/voltair'
import { ArrowFunctionBodyToken, ArrowToken, ColonTypeAnnotationToken, CommaToken, IdentifierToken, LeftParenthesisToken, RightParenthesisToken, TypeToken } from '../../../src/shared'

export const watchInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: Token
    rawValue?: string
    value?: unknown
  }[]
})[] = [
  {
    name: 'When I use a watch instruction with a function, watch is correctly tokenized',
    input: `
    - watch (foo) => {
        console.log('Foo changed')
        console.log(foo)
      }
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: WatchInstructionToken, rawValue: 'watch' },
      { checker: LeftParenthesisToken, rawValue: '(' },
      { checker: IdentifierToken, value: 'foo' },
      { checker: RightParenthesisToken, rawValue: ')' },
      { checker: ArrowToken, rawValue: '=>' },
      { checker: ArrowFunctionBodyToken, value: '{\n        console.log(\'Foo changed\')\n        console.log(foo)\n      }' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a watch instruction with an inline function, watch is correctly tokenized',
    input: `
    - watch (foo) => console.log(foo)
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: WatchInstructionToken, rawValue: 'watch' },
      { checker: LeftParenthesisToken, rawValue: '(' },
      { checker: IdentifierToken, value: 'foo' },
      { checker: RightParenthesisToken, rawValue: ')' },
      { checker: ArrowToken, rawValue: '=>' },
      { checker: ArrowFunctionBodyToken, value: 'console.log(foo)' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a watch instruction with multiple variables, watch is correctly tokenized',
    input: `
    - watch (foo, bar) => console.log(foo, bar)
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: WatchInstructionToken, rawValue: 'watch' },
      { checker: LeftParenthesisToken, rawValue: '(' },
      { checker: IdentifierToken, value: 'foo' },
      { checker: CommaToken, rawValue: ',' },
      { checker: IdentifierToken, value: 'bar' },
      { checker: RightParenthesisToken, rawValue: ')' },
      { checker: ArrowToken, rawValue: '=>' },
      { checker: ArrowFunctionBodyToken, value: 'console.log(foo, bar)' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use a watch instruction with a function and a type annotation, watch is correctly tokenized',
    input: `
    - watch (foo: string) => console.log(foo)
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: WatchInstructionToken, rawValue: 'watch' },
      { checker: LeftParenthesisToken, rawValue: '(' },
      { checker: IdentifierToken, value: 'foo' },
      { checker: ColonTypeAnnotationToken, rawValue: ':' },
      { checker: TypeToken, value: 'string' },
      { checker: RightParenthesisToken, rawValue: ')' },
      { checker: ArrowToken, rawValue: '=>' },
      { checker: ArrowFunctionBodyToken, value: 'console.log(foo)' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
]
