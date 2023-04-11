import { TransformerInputFactory } from '../../../factories/transform-input'

export const watchInstructionFixtures = [
  {
    name: 'When I pass a watcher instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'WatchInstruction',
          watchedVariables: [
            { name: 'color', type: 'string' },
          ],
          callbackExpression: 'console.log(color)',
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
            { name: 'color' },
            { name: 'size' },
          ],
          callbackExpression: 'console.log(color, size)',
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
