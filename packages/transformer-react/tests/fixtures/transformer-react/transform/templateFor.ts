import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateForFixtures = [
  {
    name: 'When I pass content with a for loop, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'ForLogical',
          parameters: {
            $value: 'let i = 0; i < 10; i++',
            $range: [0, 0],
          },
          children: [
            {
              $type: 'Expression',
              expression: {
                $value: 'i',
                $range: [0, 0],
              },
            },
          ],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = () => {
          return (
            <>
              {Array.from((function* () {
                for (let i = 0; i < 10; i++) {
                  yield <>{i}</>
                }
              })())}
            </>
          )
        }
      `,
    },
  },
]
