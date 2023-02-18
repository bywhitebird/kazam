import { EndInstructionToken, StartInstructionToken } from '../../../src/features/instruction'
import { ArrowFunctionBodyToken, WatchInstructionToken } from '../../../src/features/watch-instruction'
import type { Token } from '../../../src/lib/voltair'
import { ArrowToken, IdentifierToken, LeftParenthesisToken, RightParenthesisToken } from '../../../src/shared'

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
      { checker: ArrowFunctionBodyToken, value: 'console.log(\'Foo changed\')\n        console.log(foo)' },
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
]
