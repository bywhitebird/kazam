import type { Fixture } from '../../types/fixture'

export const propInstructionsFixtures: Fixture[] = [
  {
    name: 'When I use a prop instruction, prop is validated',
    input: `
    - prop foo
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'PropInstruction',
          name: 'foo',
        },
      ],
    },
  },
  {
    name: 'When I use a prop instruction with a type, prop is validated',
    input: `
    - prop foo: { value: string }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'PropInstruction',
          name: 'foo',
          type: '{ value: string }',
        },
      ],
    },
  },
  {
    name: 'When I use a prop instruction with a default value, prop is validated',
    input: `
    - prop foo = 'bar'
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'PropInstruction',
          name: 'foo',
          defaultValue: {
            expression: '\'bar\'',
          },
        },
      ],
    },
  },
  {
    name: 'When I use a prop instruction with a type and a default value, prop is validated',
    input: `
    - prop foo: { value: string } = { value: 'bar' }
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'PropInstruction',
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
    name: 'When I use just the prop keyword, prop is not validated',
    input: `
    - prop
    `,
    expectError: true,
  },
  {
    name: 'When I use a prop instruction with a type but no name, prop is not validated',
    input: `
    - prop : { value: string }
    `,
    expectError: true,
  },
  {
    name: 'When I use a prop instruction with a default value but no name, prop is not validated',
    input: `
    - prop = 'bar'
    `,
    expectError: true,
  },
  {
    name: 'When I use a prop instruction with a type and a default value but no name, prop is not validated',
    input: `
    - prop : { value: string } = { value: 'bar' }
    `,
    expectError: true,
  },
  {
    name: 'When I use a prop instruction with a equal sign but no default value, prop is not validated',
    input: `
    - prop foo =
    `,
    expectError: true,
  },
  {
    name: 'When I use a prop instruction with a colon but no type, prop is not validated',
    input: `
    - prop foo:
    `,
    expectError: true,
  },
  {
    name: 'When I use a prop instruction with a colon and a default value but no type, prop is not validated',
    input: `
    - prop foo: = 'bar'
    `,
    expectError: true,
  },
  {
    name: 'When I use a prop instruction with a not closed type, prop is not validated',
    input: `
    - prop foo: { value: string
    `,
    expectError: true,
  },
  {
    name: 'When I use a prop instruction with a not closed default value, prop is not validated',
    input: `
    - prop foo = { value: 'bar'
    `,
    expectError: true,
  },
  {
    name: 'When I use a prop instruction with a not closed type and a not closed default value, prop is not validated',
    input: `
    - prop foo: { value: string = { value: 'bar'
    `,
    expectError: true,
  },
]
