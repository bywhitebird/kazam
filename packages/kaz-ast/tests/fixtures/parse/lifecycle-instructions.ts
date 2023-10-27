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
    - onMount () => {
        console.log('Hello')
        console.log('Mounted')
      }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'LifecycleEventInstruction',
          event: 'mount',
          callbackExpression: 'console.log(\'Hello\')\n        console.log(\'Mounted\')',
        },
      ],
    },
  },
  {
    name: 'When I use a onMount instruction without an arrow, onMount is not validated',
    input: `
    - onMount () {
        console.log('Hello')
        console.log('Mounted')
      }
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
]
