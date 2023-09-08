import type { Fixture } from '../../types/fixture'

export const computedInstructionsFixtures: Fixture[] = [
  {
    name: 'When I use a computed instruction with a compute value, computed is validated',
    input: `
    - computed foo = n * 2
    `,
    expectedTree: {
      $type: 'root',
      instructions: [
        {
          $type: 'computed',
          name: 'foo',
          computeValue: {
            expression: 'n * 2',
          },
        },
      ],
    },
  },
  {
    name: 'When I use a computed instruction with a type and a compute value, computed is validated',
    input: `
    - computed foo: number = n * 2
    `,
    expectedTree: {
      $type: 'root',
      instructions: [
        {
          $type: 'computed',
          name: 'foo',
          type: 'number',
          computeValue: {
            expression: 'n * 2',
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
    name: 'When I use a computed instruction but no compute value, computed is not validated',
    input: `
    - computed foo
    `,
    expectError: true,
  },
  {
    name: 'When I use a computed instruction with a type but no compute value, computed is not validated',
    input: `
    - computed foo: { value: string }
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
