import { TransformerInputFactory } from '../../../factories/transform-input'

export const watchInstructionFixtures = [
  {
    name: 'When I pass a watcher instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'WatchInstruction',
          watchedVariables: [
            {
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
          callbackExpression: {
            $value: 'console.log(color)',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { useEffect } from 'react'

        export const Test = () => {
          useEffect(() => {
            console.log(color)
          }, [color])

          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass a watcher instruction with multiple watched variables, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'WatchInstruction',
          watchedVariables: [
            {
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
          callbackExpression: {
            $value: 'console.log(color, size)',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { useEffect } from 'react'

        export const Test = () => {
          useEffect(() => {
            console.log(color, size)
          }, [color, size])

          return (<></>)
        }
      `,
    },
  },
]
