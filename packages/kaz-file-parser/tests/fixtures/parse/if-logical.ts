import type { JsonValue } from '../../../src/lib/voltair/types/JsonValue'

export const ifLogicalFixtures: (
  {
    name: string
    input: string
  } & (
    | { expectedTree: JsonValue }
    | { expectError: boolean }
  )
)[] = [
  {
    name: 'When I use a if logical instruction, if logical is validated',
    input: `
    @if (a == b) {
    }
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'IfLogical',
          condition: 'a == b',
          children: [],
        },
      ],
    },
  },
  {
    name: 'When I use a if logical instruction with multiple nested if logical instructions, if logical is validated',
    input: `
    @if (a == b) {
      @if (b == c) {
      }
      @if (i == j) {
      }
    }
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'IfLogical',
          condition: 'a == b',
          children: [
            {
              $type: 'IfLogical',
              condition: 'b == c',
              children: [],
            },
            {
              $type: 'IfLogical',
              condition: 'i == j',
              children: [],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'When I use a if logical instruction with a missing left parenthesis, if logical is not validated',
    input: `
    @if a == b) {
    }
    `,
    expectError: true,
  },
  {
    name: 'When I use a if logical instruction with a missing right parenthesis, if logical is not validated',
    input: `
    @if (a == b {
    `,
    expectError: true,
  },
  {
    name: 'When I use a if logical instruction with a missing left curly bracket, if logical is not validated',
    input: `
    @if (a == b)
    }
    `,
    expectError: true,
  },
  {
    name: 'When I use a if logical instruction with a missing right curly bracket, if logical is not validated',
    input: `
    @if (a == b) {
    `,
    expectError: true,
  },
  {
    name: 'When I use a if logical instruction with a missing parameters, if logical is not validated',
    input: `
    @if () {
    }
    `,
    expectError: true,
  },
  {
    name: 'When I use a if logical instruction with a missing parenthesis, if logical is not validated',
    input: `
    @if {
    }
    `,
    expectError: true,
  },
]
