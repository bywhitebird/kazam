import { TransformerInputFactory } from '../../../factories/transform-input'

export const importInstructionFixtures = [
  {
    name: 'When I pass a default import instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ImportInstruction',
          imports: [
            {
              $type: 'DefaultImport',
              name: {
                $value: 'UI',
                $range: [0, 0],
              },
            },
          ],
          from: {
            $value: 'whitebird-ui',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'
        import UI from 'whitebird-ui'

        export const Test = () => {
          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass a named import instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ImportInstruction',
          imports: [
            {
              $type: 'NamedImport',
              // name: 'Button',
              name: {
                $value: 'Button',
                $range: [0, 0],
              },
            },
          ],
          // from: 'whitebird-ui',
          from: {
            $value: 'whitebird-ui',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'
        import { Button } from 'whitebird-ui'

        export const Test = () => {
          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass a namespace import instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ImportInstruction',
          imports: [
            {
              $type: 'NamespaceImport',
              name: {
                $value: 'components',
                $range: [0, 0],
              },
            },
          ],
          from: {
            $value: 'whitebird-ui',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'
        import * as components from 'whitebird-ui'

        export const Test = () => {
          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass a default and named import instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ImportInstruction',
          imports: [
            {
              $type: 'DefaultImport',
              name: {
                $value: 'UI',
                $range: [0, 0],
              },
            },
            {
              $type: 'NamedImport',
              name: {
                $value: 'Button',
                $range: [0, 0],
              },
            },
          ],
          from: {
            $value: 'whitebird-ui',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'
        import UI, { Button } from 'whitebird-ui'

        export const Test = () => {
          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass a default and namespace import instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'ImportInstruction',
          imports: [
            {
              $type: 'DefaultImport',
              name: {
                $value: 'UI',
                $range: [0, 0],
              },
            },
            {
              $type: 'NamespaceImport',
              name: {
                $value: 'components',
                $range: [0, 0],
              },
            },
          ],
          from: {
            $value: 'whitebird-ui',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React from 'react'
        import UI from 'whitebird-ui'
        import * as components from 'whitebird-ui'

        export const Test = () => {
          return (<></>)
        }
      `,
    },
  },
]
