import type { JsonValue } from '../../../src/lib/voltair/types/JsonValue'

export const watchInstructionsFixtures: (
  {
    name: string
    input: string
  } & (
    | { expectedTree: JsonValue }
    | { expectError: boolean }
  )
)[] = [
  {
    name: 'When I use a watch instruction with a function, watch is validated',
    input: `
    - watch (foo) => {
        console.log('Foo changed')
        console.log(foo)
      }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'WatchInstruction',
          watchedVariable: 'foo',
          callbackExpression: 'console.log(\'Foo changed\')\n        console.log(foo)',
        },
      ],
    },
  },
  {
    name: 'When I use a watch instruction with an inline function, watch is validated',
    input: `
    - watch (foo) => console.log(foo)
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'WatchInstruction',
          watchedVariable: 'foo',
          callbackExpression: 'console.log(foo)',
        },
      ],
    },
  },
  {
    name: 'When I use a watch instruction with a function without a dependency, watch is not validated',
    input: `
    - watch () => {
        console.log('Foo changed')
        console.log(foo)
      }
    `,
    expectError: true,
  },
  {
    name: 'When I use a watch instruction with a function without closing curly bracket, watch is not validated',
    input: `
    - watch (foo) => {
        console.log('Foo changed')
        console.log(foo)
    `,
    expectError: true,
  },
  {
    name: 'When I use a watch instruction with a function without opening curly bracket, watch is not validated',
    input: `
    - watch (foo) =>
        console.log('Foo changed')
        console.log(foo)
      }
    `,
    expectError: true,
  },
  {
    name: 'When I use a watch instruction with an inline function but with two statements, watch is not validated',
    input: `
    - watch (foo) => console.log(foo); console.log(foo)
    `,
    expectError: true,
  },
  {
    name: 'When I use a watch instruction without wrapping dependency in parentheses, watch is not validated',
    input: `
    - watch foo => console.log(foo)
    `,
    expectError: true,
  },
]
