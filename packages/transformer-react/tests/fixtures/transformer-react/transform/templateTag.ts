import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateTagFixtures = [
  {
    name: 'When I pass content with tag, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'Tag',
          // tagName: 'div',
          tagName: {
            $value: 'div',
            $range: [0, 0],
          },
          attributes: [],
          children: [
            {
              $type: 'Text',
              text: {
                $value: 'Hello world',
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
          tagName: {
            $value: 'div',
            $range: [0, 0],
          },
          attributes: [
            {
              $type: 'TagAttribute',
              name: {
                $value: 'className',
                $range: [0, 0],
              },
              value: {
                $value: 'hello',
                $range: [0, 0],
              },
            },
            {
              $type: 'TagAttribute',
              name: {
                $value: 'id',
                $range: [0, 0],
              },
              expression: {
                $value: 'id',
                $range: [0, 0],
              },
            },
          ],
          children: [
            {
              $type: 'Text',
              text: {
                $value: 'Hello world',
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
          tagName: {
            $value: 'div',
            $range: [0, 0],
          },
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
          tagName: {
            $value: 'div',
            $range: [0, 0],
          },
          attributes: [
            {
              $type: 'TagEventAttribute',
              name: {
                $value: 'click',
                $range: [0, 0],
              },
              expression: {
                $value: 'handleClick',
                $range: [0, 0],
              },
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
