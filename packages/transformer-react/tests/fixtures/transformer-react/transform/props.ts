import { TransformerInputFactory } from '../../../factories/transform-input'

export const propsSpecFixtures = [
  {
    name: 'When I pass props without type nor default value, component is generated',
    input: TransformerInputFactory.create({
      props: { foo: {}, bar: {} },
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = ({ foo, bar }: { foo: any; bar: any }) => {
          return (
            <>
              <div />
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass props with type and default value, component is generated',
    input: TransformerInputFactory.create({
      props: {
        foo: { type: 'string', defaultValueExpression: '"foo"' },
        bar: { type: 'number', defaultValueExpression: '42' },
      },
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = ({ foo = "foo", bar = 42 }: { foo: string; bar: number }) => {
          return (
            <>
              <div />
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass props and hasChildren is true, component is generated',
    input: TransformerInputFactory.create({
      hasChildren: true,
      props: { foo: {}, bar: {} },
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { type ReactNode } from 'react'

        export const Test = ({ foo, bar, children }: { foo: any; bar: any; children: ReactNode }) => {
          return (
            <>
              <div />
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass props named children and hasChildren is true, component is not generated',
    input: TransformerInputFactory.create({
      hasChildren: true,
      props: { children: {} },
    }),
    expectedError: Error,
  },
]
