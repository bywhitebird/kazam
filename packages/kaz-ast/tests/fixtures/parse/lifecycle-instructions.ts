import type { JsonValue } from '../../../src/lib/voltair/types/JsonValue'

export const lifecycleInstructionsFixtures: (
  {
    name: string
    input: string
  } & (
    | { expectedTree: JsonValue }
    | { expectError: boolean }
  )
)[] = [
  {
    name: 'When I use a onMount instruction with a function, onMount is validated',
    input: `
    - onMount = () => {
        console.log('Mounted')
      }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'LifecycleEventInstruction',
          event: 'mount',
          callbackExpression: '() => {\n        console.log(\'Mounted\')\n      }',
        },
      ],
    },
  },
  {
    name: 'When I use a onMount instruction without a function, onMount is not validated',
    input: `
    - onMount =
    `,
    expectError: true,
  },
  {
    name: 'When I use only the onMount keyword, onMount is not validated',
    input: `
    - onMount
    `,
    expectError: true,
  },
  {
    name: 'When I use a onMount instruction without the equal sign, onMount is not validated',
    input: `
    - onMount () => {
        console.log('Mounted')
      }
    `,
    expectError: true,
  },
]
