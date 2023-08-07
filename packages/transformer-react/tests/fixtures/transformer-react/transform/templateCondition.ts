import { TransformerInputFactory } from '../../../factories/transform-input'

export const templateConditionFixtures = [
  {
    name: 'When I pass conditional content, component is generated',
    input: TransformerInputFactory.create({
      template: [
        {
          $type: 'IfLogical',
          condition: {
            $value: '0 === 0',
            $range: [0, 0],
          },
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
          condition: {
            $value: '0 === 0',
            $range: [0, 0],
          },
          children: [
            {
              $type: 'Text',
              text: {
                $value: 'Hello world',
                $range: [0, 0],
              },
            },
          ],
          else: {
            $type: 'ElseLogical',
            children: [
              {
                $type: 'Text',
                text: {
                  $value: 'Goodbye world',
                  $range: [0, 0],
                },
              },
            ],
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
          condition: {
            $value: '0 === 0',
            $range: [0, 0],
          },
          children: [
            {
              $type: 'Text',
              text: {
                $value: 'Hello world',
                $range: [0, 0],
              },
            },
          ],
          else: {
            $type: 'ElseLogical',
            if: {
              $type: 'ElseIfLogical',
              condition: {
                $value: '0 === 1',
                $range: [0, 0],
              },
              children: [
                {
                  $type: 'Text',
                  text: {
                    $value: 'Goodbye world',
                    $range: [0, 0],
                  },
                },
              ],
              else: {
                $type: 'ElseLogical',
                if: {
                  $type: 'ElseIfLogical',
                  condition: {
                    $value: '0 === 2',
                    $range: [0, 0],
                  },
                  children: [
                    {
                      $type: 'Text',
                      text: {
                        $value: 'Good night world',
                        $range: [0, 0],
                      },
                    },
                  ],
                  else: {
                    $type: 'ElseLogical',
                    children: [
                      {
                        $type: 'Text',
                        text: {
                          $value: 'Bad night world',
                          $range: [0, 0],
                        },
                      },
                    ],
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
