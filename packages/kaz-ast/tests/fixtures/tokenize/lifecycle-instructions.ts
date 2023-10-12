import { EndInstructionToken, StartInstructionToken } from '../../../src/features/instruction'
import { LifecycleInstructionToken } from '../../../src/features/lifecycle-instruction'
import type { Token } from '../../../src/lib/voltair'
import { ArrowFunctionBodyToken, ArrowToken, LeftParenthesisToken, RightParenthesisToken } from '../../../src/shared'

export const lifecycleInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: Token
    rawValue?: string
    value?: unknown
  }[]
})[] = [
  {
    name: 'When I use a onMount instruction with a function, onMount is correctly tokenized',
    input: `
    - onMount () => {
      console.log('Hello')
      console.log('Mounted')
    }
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: LifecycleInstructionToken, rawValue: 'onMount' },
      { checker: LeftParenthesisToken, rawValue: '(' },
      { checker: RightParenthesisToken, rawValue: ')' },
      { checker: ArrowToken, rawValue: '=>' },
      { checker: ArrowFunctionBodyToken, value: 'console.log(\'Hello\')\n      console.log(\'Mounted\')' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
]
