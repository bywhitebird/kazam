import type { JsonValue } from '../../../src/types/JsonValue'

export const computedInstructionsFixtures: (
  {
    name: string
    input: string
  } & (
    | { expectedTree: JsonValue }
    | { expectError: boolean }
  )
)[] = [
  {
    name: 'When I use a computed instruction, computed is validated',
    input: `
    - computed foo
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ComputedInstruction',
          name: 'foo',
        },
      ],
    },
  },
  {
    name: 'When I use a computed instruction with a type, computed is validated',
    input: `
    - computed foo: { value: string }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ComputedInstruction',
          name: 'foo',
          type: '{ value: string }',
        },
      ],
    },
  },
  {
    name: 'When I use a computed instruction with a default value, computed is validated',
    input: `
    - computed foo = 'bar'
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ComputedInstruction',
          name: 'foo',
          defaultValue: {
            expression: '\'bar\'',
          },
        },
      ],
    },
  },
  {
    name: 'When I use a computed instruction with a type and a default value, computed is validated',
    input: `
    - computed foo: { value: string } = { value: 'bar' }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ComputedInstruction',
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
    name: 'When I use just the computed keyword, computed is not validated',
    input: `
    - computed
    `,
    expectError: true,
  },
  {
    name: 'When I use a computed instruction with a type but no name, computed is not validated',
    input: `
    - computed : { value: string }
    `,
    expectError: true,
  },
  {
    name: 'When I use a computed instruction with a default value but no name, computed is not validated',
    input: `
    - computed = 'bar'
    `,
    expectError: true,
  },
  {
    name: 'When I use a computed instruction with a type and a default value but no name, computed is not validated',
    input: `
    - computed : { value: string } = { value: 'bar' }
    `,
    expectError: true,
  },
  {
    name: 'When I use a computed instruction with a equal sign but no default value, computed is not validated',
    input: `
    - computed foo =
    `,
    expectError: true,
  },
  {
    name: 'When I use a computed instruction with a colon but no type, computed is not validated',
    input: `
    - computed foo:
    `,
    expectError: true,
  },
  {
    name: 'When I use a computed instruction with a colon and a default value but no type, computed is not validated',
    input: `
    - computed foo: = 'bar'
    `,
    expectError: true,
  },
  {
    name: 'When I use a computed instruction with a not closed type, computed is not validated',
    input: `
    - computed foo: { value: string
    `,
    expectError: true,
  },
  {
    name: 'When I use a computed instruction with a not closed default value, computed is not validated',
    input: `
    - computed foo = { value: 'bar'
    `,
    expectError: true,
  },
  {
    name: 'When I use a computed instruction with a not closed type and a not closed default value, computed is not validated',
    input: `
    - computed foo: { value: string = { value: 'bar'
    `,
    expectError: true,
  },
]
