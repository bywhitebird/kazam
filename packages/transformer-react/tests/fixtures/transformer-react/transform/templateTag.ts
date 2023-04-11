import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateTagFixtures = [
  {
    name: 'When I pass content with tag, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'Tag',
          tagName: 'div',
          attributes: [],
          children: [{ $type: 'Text', text: 'Hello world' }],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = () => {
          return (
            <>
              <div>Hello world</div>
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass content with tag and attributes, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'Tag',
          tagName: 'div',
          attributes: [
            {
              $type: 'TagAttribute',
              name: 'className',
              value: 'hello',
            },
            {
              $type: 'TagAttribute',
              name: 'id',
              expression: 'id',
            },
          ],
          children: [{ $type: 'Text', text: 'Hello world' }],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = () => {
          return (
            <>
              <div className="hello" id={id}>Hello world</div>
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass content with tag without children, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'Tag',
          tagName: 'div',
          attributes: [],
          children: [],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = () => {
          return (
            <>
              <div></div>
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass content with tag and events, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'Tag',
          tagName: 'div',
          attributes: [
            {
              $type: 'TagEventAttribute',
              name: 'click',
              expression: 'handleClick',
            },
          ],
          children: [],
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'

        export const Test = () => {
          return (
            <>
              <div onClick={handleClick}></div>
            </>
          )
        }
      `,
    },
  },
]
