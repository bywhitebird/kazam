import type { JsonValue } from '../../../src/lib/voltair/types/JsonValue'

export const eventInstructionsFixtures: (
  {
    name: string
    input: string
  } & (
    | { expectedTree: JsonValue }
    | { expectError: boolean }
  )
)[] = [
  {
    name: 'When I use an event instruction with a function, event is validated',
    input: `
    - on:ready (e) => {
        console.log('Ready')
        console.log(e)
      }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'EventInstruction',
          eventName: 'ready',
          parameters: [{ name: 'e' }],
          callbackExpression: 'console.log(\'Ready\')\n        console.log(e)',
        },
      ],
    },
  },
  {
    name: 'When I use an event instruction with an inline function, event is validated',
    input: `
    - on:ready (e) => console.log('Ready')
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'EventInstruction',
          eventName: 'ready',
          parameters: [{ name: 'e' }],
          callbackExpression: 'console.log(\'Ready\')',
        },
      ],
    },
  },
  {
    name: 'When I use an event instruction with a function with multiple dependencies, event is validated',
    input: `
    - on:ready (e, f) => {
        console.log('Ready')
        console.log(e, f)
      }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'EventInstruction',
          eventName: 'ready',
          parameters: [{ name: 'e' }, { name: 'f' }],
          callbackExpression: 'console.log(\'Ready\')\n        console.log(e, f)',
        },
      ],
    },
  },
  {
    name: 'When I use an event instruction with a function and typed parameters, event is validated',
    input: `
    - on:ready (e: Event, f: Foo) => {
        console.log('Ready')
        console.log(e, f)
      }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'EventInstruction',
          eventName: 'ready',
          parameters: [{ name: 'e', type: 'Event' }, { name: 'f', type: 'Foo' }],
          callbackExpression: 'console.log(\'Ready\')\n        console.log(e, f)',
        },
      ],
    },
  },
  {
    name: 'When I use an event instruction with a function without closing curly bracket, event is not validated',
    input: `
    - on:ready (e) => {
        console.log('Ready')
        console.log(e)
    `,
    expectError: true,
  },
  {
    name: 'When I use an instruction with a function without opening curly bracket, event is not validated',
    input: `
    - on:ready (e) =>
        console.log('Ready')
        console.log(e)
      }
    `,
    expectError: true,
  },
  {
    name: 'When I use an event instruction with an inline function but with two statements, event is not validated',
    input: `
    - on:ready (e) => console.log('Ready'); console.log(e)
    `,
    expectError: true,
  },
  {
    name: 'When I use an event instruction without wrapping dependency in parentheses, event is not validated',
    input: `
    - on:ready e => console.log('Ready')
    `,
    expectError: true,
  },
]
