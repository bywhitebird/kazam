import { TransformerInputFactory } from '../../../factories/transform-input'

export const stateInstructionFixtures = [
  {
    name: 'When I pass a state instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'StateInstruction',
          name: {
            $value: 'color',
            $range: [0, 0],
          },
          type: {
            $value: 'string',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { useState } from 'react'

        export const Test = () => {
          const [color, setColor] = useState<string>()

          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass a state instruction with default value, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'StateInstruction',
          name: {
            $value: 'color',
            $range: [0, 0],
          },
          type: {
            $value: 'string',
            $range: [0, 0],
          },
          defaultValue: {
            expression: {
              $value: '\'red\'',
              $range: [0, 0],
            },
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { useState } from 'react'

        export const Test = () => {
          const [color, setColor] = useState<string>('red')

          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass a state instruction without type, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'StateInstruction',
          name: {
            $value: 'color',
            $range: [0, 0],
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { useState } from 'react'

        export const Test = () => {
          const [color, setColor] = useState()

          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass multiple state instructions, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'StateInstruction',
          name: {
            $value: 'color',
            $range: [0, 0],
          },
          type: {
            $value: 'string',
            $range: [0, 0],
          },
        },
        {
          $type: 'StateInstruction',
          name: {
            $value: 'size',
            $range: [0, 0],
          },
          defaultValue: {
            expression: {
              $value: '10',
              $range: [0, 0],
            },
          },
        },
      ],
    }),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { useState } from 'react'

        export const Test = () => {
          const [color, setColor] = useState<string>()
          const [size, setSize] = useState(10)

          return (<></>)
        }
      `,
    },
  },
  {
    name: 'When I pass a state instruction and change its value, component is generated',
    input: TransformerInputFactory.create(
      ` - state color: string

div (on:click={      () => { color = 'red' }}) {}`,
    ),
    expectedOutput: {
      'components/Test.tsx': `
        import React, { useState } from 'react'

        export const Test = () => {
          const [color, setColor] = useState<string>()

          return (<>
            <div onClick={() => { setColor((color) => {
              color = 'red'
              return color
            }) }}></div>
            </>
          )
        }
      `,
    },
  },
]
