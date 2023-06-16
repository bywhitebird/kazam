import { TransformerInputFactory } from '../../../factories/transform-input'

export const propInstructionFixtures = [
  {
    name: 'When I pass a prop instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'PropInstruction',
          name: {
            $value: 'color',
            $range: [0, 0],
          },
          type: {
            $value: 'string',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = ({ color }: { color: string }) => {
          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass a prop instruction with default value, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'PropInstruction',
          name: {
            $value: 'color',
            $range: [0, 0],
          },
          type: {
            $value: 'string',
            $range: [0, 0],
          },
          defaultValue: {
            expression: {
              $value: '\'red\'',
              $range: [0, 0],
            },
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = ({ color = 'red' }: { color: string }) => {
          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass a prop instruction without type, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'PropInstruction',
          name: {
            $value: 'color',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = ({ color }: { color: any }) => {
          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass multiple prop instructions, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'PropInstruction',
          name: {
            $value: 'color',
            $range: [0, 0],
          },
          type: {
            $value: 'string',
            $range: [0, 0],
          },
        },
        {
          $type: 'PropInstruction',
          name: {
            $value: 'size',
            $range: [0, 0],
          },
          type: {
            $value: 'number',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = ({ color, size }: { color: string, size: number }) => {
          return (<></>)
        }
      `,
    },
  },
]
