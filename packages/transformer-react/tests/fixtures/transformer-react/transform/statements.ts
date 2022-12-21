import { TransformerInputFactory } from '../../../factories/transform-input'

export const statementsSpecFixtures = [
  {
    name: 'When I pass a state, component is generated',
    input: TransformerInputFactory.create({
      statements: [
        { name: 'foo', type: '{ bar: string }', initialValueExpression: '{ bar: "foo" }' },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { useState } from 'react'

        export const Test = () => {
          const [foo, setFoo] = useState<{ bar: string }>({ bar: "foo" })

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
    name: 'When I pass a state and a computed, component is generated',
    input: TransformerInputFactory.create({
      statements: [
        { name: 'foo', type: '{ bar: string }', initialValueExpression: '{ bar: "foo" }' },
        { name: 'baz', type: 'string', getterExpression: 'foo.bar' },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { useState } from 'react'

        export const Test = () => {
          const [foo, setFoo] = useState<{ bar: string }>({ bar: "foo" })
          const baz = foo.bar

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
    name: 'When I pass a state and a watcher, component is generated',
    input: TransformerInputFactory.create({
      statements: [
        { name: 'foo', type: '{ bar: string }', initialValueExpression: '{ bar: "foo" }' },
        { stateName: 'foo.bar', callbackExpression: 'console.log(foo.bar)' },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { useState, useEffect } from 'react'

        export const Test = () => {
          const [foo, setFoo] = useState<{ bar: string }>({ bar: "foo" })

          useEffect(() => {
            console.log(foo.bar)
          }, [foo.bar])

          return (
            <>
              <div />
            </>
          )
        }
      `,
    },
  },
]
