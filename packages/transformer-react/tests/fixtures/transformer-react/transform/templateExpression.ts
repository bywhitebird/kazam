import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateExpressionFixtures = [
  {
    name: 'When I pass content of type expression, component is generated',
    input: TransformerInputFactory.create({
      template: [{ $type: 'Expression', expression: 'children' }],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = () => {
          return (
            <>
              {children}
            </>
          )
        }
      `,
    },
  },
]
