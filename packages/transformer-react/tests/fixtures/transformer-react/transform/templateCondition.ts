import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateConditionFixtures = [
  {
    name: 'When I pass conditional content, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'IfLogical',
          condition: '0 === 0',
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
              {
                0 === 0
                  ? <>Hello world</>
                  : null
              }
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass conditional content with else, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'IfLogical',
          condition: '0 === 0',
          children: [{ $type: 'Text', text: 'Hello world' }],
          else: {
            $type: 'ElseLogical',
            children: [{ $type: 'Text', text: 'Goodbye world' }],
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
              {
                0 === 0
                  ? <>Hello world</>
                  : <>Goodbye world</>
              }
            </>
          )
        }
      `,
    },
  },
  {
    name: 'When I pass conditional content with multiple else if and else, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'IfLogical',
          condition: '0 === 0',
          children: [{ $type: 'Text', text: 'Hello world' }],
          else: {
            $type: 'ElseLogical',
            if: {
              $type: 'ElseIfLogical',
              condition: '0 === 1',
              children: [{ $type: 'Text', text: 'Goodbye world' }],
              else: {
                $type: 'ElseLogical',
                if: {
                  $type: 'ElseIfLogical',
                  condition: '0 === 2',
                  children: [{ $type: 'Text', text: 'Good night world' }],
                  else: {
                    $type: 'ElseLogical',
                    children: [{ $type: 'Text', text: 'Bad night world' }],
                  },
                },
              },
            },
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
              {
                0 === 0
                  ? <>Hello world</>
                  : 0 === 1
                    ? <>Goodbye world</>
                    : 0 === 2
                      ? <>Good night world</>
                      : <>Bad night world</>
              }
            </>
          )
        }
      `,
    },
  },
]
