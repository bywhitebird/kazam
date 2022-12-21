import { TransformerInputFactory } from '../../../factories/transform-input'

export const contentSpecFixtures = [
  {
    name: 'When I pass content of type text, component is generated',
    input: TransformerInputFactory.create({
      template: [{ text: 'Hello world' }],
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
  {
    name: 'When I pass content of type expression, component is generated',
    input: TransformerInputFactory.create({
      hasChildren: true,
      template: [{ expression: 'children' }],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { type ReactNode } from 'react'

        export const Test = ({ children }: { children: ReactNode }) => {
          return (
            <>
              {children}
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass content with tag, attributes, and events, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          tag: 'div',
          attributes: [
            { name: 'className', valueExpression: '"foo"' },
            { name: 'style', valueExpression: '{ color: "red" }' },
          ],
          events: [
            { name: 'click', callbackExpression: '() => console.log("foo")' },
            { name: 'mouseOver', callbackExpression: '() => console.log("bar")' },
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
              <div className={"foo"} style={{ color: "red" }} onClick={() => console.log("foo")} onMouseOver={() => console.log("bar")} />
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass content with another component, the other component is imported and component is generated',
    input: TransformerInputFactory.createMany(
      {
        name: 'Foo',
        template: [{ tag: 'div' }],
      },
      {
        name: 'Bar',
        template: [
          {
            component: 'Foo',
          },
        ],
      },
    ),
    expectedOutput: {
      'components/Foo.tsx': `
        import React from 'react'

        export const Foo = () => {
          return (
            <>
              <div />
            </>
          )
        }
      `,
      'components/Bar.tsx': `
        import React from 'react'

        import { Foo } from './Foo'

        export const Bar = () => {
          return (
            <>
              <Foo />
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass deeply nested content, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          tag: 'div',
          content: [
            {
              tag: 'p',
              content: [
                { text: 'Hello ' },
                {
                  tag: 'span',
                  content: [{ text: 'world' }],
                },
              ],
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
              <div>
                <p>Hello <span>world</span></p>
              </div>
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass content with a loop, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          tag: 'div',
          content: [
            {
              loop: {
                iterableExpression: 'people',
                itemIdentifier: 'person',
                indexIdentifier: 'index',
                content: [
                  {
                    tag: 'p',
                    content: [
                      { expression: 'index' },
                      { text: '. Hello ' },
                      { expression: 'person.name' },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
      props: {
        people: {},
      },
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = ({ people }: { people: any }) => {
          return (
            <>
              <div>
                {people.map((person, index) => (
                    <p>{index}. Hello {person.name}</p>
                ))}
              </div>
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass content with a conditional, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          tag: 'div',
          content: [
            {
              conditional: {
                conditionExpression: 'hello',
                trueContent: [
                  {
                    tag: 'p',
                    content: [
                      { text: 'Hello world' },
                    ],
                  },
                ],
                falseContent: [
                  {
                    tag: 'p',
                    content: [
                      { text: 'Goodbye world' },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
      props: {
        hello: { type: 'boolean' },
      },
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = ({ hello }: { hello: boolean }) => {
          return (
            <>
              <div>
                {hello ? (
                  <p>Hello world</p>
                ) : (
                  <p>Goodbye world</p>
                )}
              </div>
            </>
          )
        }
      `,
    },
  },
]
