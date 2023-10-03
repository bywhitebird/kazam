import { EndInstructionToken, StartInstructionToken } from '../../../src/features/instruction'
import { LifecycleInstructionToken } from '../../../src/features/lifecycle-instruction'
import type { Token } from '../../../src/lib/voltair'
import { EqualVariableDeclarationToken, ExpressionToken } from '../../../src/shared'

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
    - onMount = () => {
      console.log('Mounted')
    }
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: LifecycleInstructionToken, rawValue: 'onMount' },
      { checker: EqualVariableDeclarationToken, rawValue: '=' },
      { checker: ExpressionToken, value: '() => {\n      console.log(\'Mounted\')\n    }' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
]
