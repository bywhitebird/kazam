import type { JsonValue } from '../../../src/types/JsonValue'

export const stateInstructionsFixtures: (
  {
    name: string
    input: string
  } & (
    | { expectedTree: JsonValue }
    | { expectError: boolean }
  )
)[] = [
  {
    name: 'When I use a state instruction, state is validated',
    input: `
    - state foo
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'StateInstruction',
          name: 'foo',
        },
      ],
    },
  },
  {
    name: 'When I use a state instruction with a type, state is validated',
    input: `
    - state foo: { value: string }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'StateInstruction',
          name: 'foo',
          type: '{ value: string }',
        },
      ],
    },
  },
  {
    name: 'When I use a state instruction with a default value, state is validated',
    input: `
    - state foo = 'bar'
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'StateInstruction',
          name: 'foo',
          defaultValue: {
            expression: '\'bar\'',
          },
        },
      ],
    },
  },
  {
    name: 'When I use a state instruction with a type and a default value, state is validated',
    input: `
    - state foo: { value: string } = { value: 'bar' }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'StateInstruction',
          name: 'foo',
          type: '{ value: string }',
          defaultValue: {
            expression: '{ value: \'bar\' }',
          },
        },
      ],
    },
  },
  {
    name: 'When I use just the state keyword, state is not validated',
    input: `
    - state
    `,
    expectError: true,
  },
  {
    name: 'When I use a state instruction with a type but no name, state is not validated',
    input: `
    - state : { value: string }
    `,
    expectError: true,
  },
  {
    name: 'When I use a state instruction with a default value but no name, state is not validated',
    input: `
    - state = 'bar'
    `,
    expectError: true,
  },
  {
    name: 'When I use a state instruction with a type and a default value but no name, state is not validated',
    input: `
    - state : { value: string } = { value: 'bar' }
    `,
    expectError: true,
  },
  {
    name: 'When I use a state instruction with a equal sign but no default value, state is not validated',
    input: `
    - state foo =
    `,
    expectError: true,
  },
  {
    name: 'When I use a state instruction with a colon but no type, state is not validated',
    input: `
    - state foo:
    `,
    expectError: true,
  },
  {
    name: 'When I use a state instruction with a colon and a default value but no type, state is not validated',
    input: `
    - state foo: = 'bar'
    `,
    expectError: true,
  },
  {
    name: 'When I use a state instruction with a not closed type, state is not validated',
    input: `
    - state foo: { value: string
    `,
    expectError: true,
  },
  {
    name: 'When I use a state instruction with a not closed default value, state is not validated',
    input: `
    - state foo = { value: 'bar'
    `,
    expectError: true,
  },
  {
    name: 'When I use a state instruction with a not closed type and a not closed default value, state is not validated',
    input: `
    - state foo: { value: string = { value: 'bar'
    `,
    expectError: true,
  },
]
