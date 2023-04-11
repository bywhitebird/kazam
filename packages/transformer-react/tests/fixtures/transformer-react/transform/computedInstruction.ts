import { TransformerInputFactory } from '../../../factories/transform-input'

export const computedInstructionFixtures = [
  {
    name: 'When I pass a computed instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ComputedInstruction',
          name: 'computed',
          computeValue: {
            expression: '1 + 1',
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = () => {
          const computed = 1 + 1

          return (<></>)
        }
      `,
    },
  },
]
