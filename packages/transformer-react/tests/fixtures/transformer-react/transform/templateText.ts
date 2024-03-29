import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateTextFixtures = [
  {
    name: 'When I pass content of type text, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'Text',
          text: {
            $value: 'Hello world',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = () => {
          return (
            <>
              Hello world
            </>
          )
        }
      `,
    },
  },
]
