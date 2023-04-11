import { TransformerInputFactory } from '../../../factories/transform-input'

export const stateInstructionFixtures = [
  {
    name: 'When I pass a state instruction, component is generated',
    input: TransformerInputFactory.create({
      instructions: [
        {
          $type: 'StateInstruction',
          name: 'color',
          type: 'string',
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
          name: 'color',
          type: 'string',
          defaultValue: {
            expression: '\'red\'',
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
          name: 'color',
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
          name: 'color',
          type: 'string',
        },
        {
          $type: 'StateInstruction',
          name: 'size',
          defaultValue: {
            expression: '10',
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
]
