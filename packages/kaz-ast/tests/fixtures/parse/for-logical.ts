import type { JsonValue } from '../../../src/lib/voltair/types/JsonValue'

export const forLogicalFixtures: (
  {
    name: string
    input: string
  } & (
    | { expectedTree: JsonValue }
    | { expectError: boolean }
  )
)[] = [
  {
    name: 'When I use a for logical instruction, for logical is validated',
    input: `
    @for (let i = 0; i < 10; i++) {
    }
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'ForLogical',
          parameters: 'let i = 0; i < 10; i++',
          children: [],
        },
      ],
    },
  },
  {
    name: 'When I use a for logical instruction with multiple nested for logical instructions, for logical is validated',
    input: `
    @for (let i = 0; i < 10; i++) {
      @for (let j = 0; j < 10; j++) {
      }
      @for (let k = 0; k < 10; k++) {
      }
    }
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'ForLogical',
          parameters: 'let i = 0; i < 10; i++',
          children: [
            {
              $type: 'ForLogical',
              parameters: 'let j = 0; j < 10; j++',
              children: [],
            },
            {
              $type: 'ForLogical',
              parameters: 'let k = 0; k < 10; k++',
              children: [],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'When I use a for logical instruction with a missing left parenthesis, for logical is not validated',
    input: `
    @for let i = 0; i < 10; i++) {
    }
    `,
    expectError: true,
  },
  {
    name: 'When I use a for logical instruction with a missing right parenthesis, for logical is not validated',
    input: `
    @for (let i = 0; i < 10; i++ {
    `,
    expectError: true,
  },
  {
    name: 'When I use a for logical instruction with a missing left curly bracket, for logical is not validated',
    input: `
    @for (let i = 0; i < 10; i++)
    }
    `,
    expectError: true,
  },
  {
    name: 'When I use a for logical instruction with a missing right curly bracket, for logical is not validated',
    input: `
    @for (let i = 0; i < 10; i++) {
    `,
    expectError: true,
  },
  {
    name: 'When I use a for logical instruction with a missing parameters, for logical is not validated',
    input: `
    @for () {
    }
    `,
    expectError: true,
  },
  {
    name: 'When I use a for logical instruction with a missing parenthesis, for logical is not validated',
    input: `
    @for {
    }
    `,
    expectError: true,
  },
]
