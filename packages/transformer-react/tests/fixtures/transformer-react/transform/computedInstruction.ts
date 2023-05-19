import { TransformerInputFactory } from '../../../factories/transform-input'

export const computedInstructionFixtures = [
  {
    name: 'When I pass a computed instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ComputedInstruction',
          name: {
            $value: 'computed',
            $range: [0, 0],
          },
          computeValue: {
            expression: {
              $value: '1 + 1',
              $range: [0, 0],
            },
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
