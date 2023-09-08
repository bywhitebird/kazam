import type { Fixture } from '../../types/fixture'

export const conditionLogicalFixtures: Fixture[] = [
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
    name: 'When I use a if logical instruction with else logical instruction, if logical is validated',
    input: `
    @if (a == b) {
    } @else {
    }
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'IfLogical',
          condition: 'a == b',
          children: [],
          else: {
            $type: 'ElseLogical',
            children: [],
          },
        },
      ],
    },
  },
  {
    name: 'When I use a if logical instruction with else if logical instruction, if logical is validated',
    input: `
    @if (a == b) {
    } @else if (c == d) {
    }
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'IfLogical',
          condition: 'a == b',
          children: [],
          else: {
            if: {
              $type: 'ElseIfLogical',
              condition: 'c == d',
              children: [],
            },
          },
        },
      ],
    },
  },
  {
    name: 'When I use a if logical instruction with else if logical instruction and else logical instruction, if logical is validated',
    input: `
    @if (a == b) {
    } @else if (c == d) {
    } @else {
    }
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'IfLogical',
          condition: 'a == b',
          children: [],
          else: {
            if: {
              $type: 'ElseIfLogical',
              condition: 'c == d',
              children: [],
              else: {
                $type: 'ElseLogical',
                children: [],
              },
            },
          },
        },
      ],
    },
  },
  {
    name: 'When I use a if logical instruction with multiple else if with else logical instruction and nested if logical instruction, if logical is validated',
    input: `
    @if (a == b) {
      @if (b == c) {
      }
      @if (i == j) {
      }
    } @else if (c == d) {
      @if (e == f) {
      }
      @else {
      }
    } @else {
      @if (i == j) {
      }
      @else if (k == l) {
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
          else: {
            if: {
              $type: 'ElseIfLogical',
              condition: 'c == d',
              children: [
                {
                  $type: 'IfLogical',
                  condition: 'e == f',
                  children: [],
                  else: {
                    $type: 'ElseLogical',
                    children: [],
                  },
                },
              ],
              else: {
                $type: 'ElseLogical',
                children: [
                  {
                    $type: 'IfLogical',
                    condition: 'i == j',
                    children: [],
                    else: {
                      if: {
                        $type: 'ElseIfLogical',
                        condition: 'k == l',
                        children: [],
                      },
                    },
                  },
                ],
              },
            },
          },
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
  {
    name: 'When I use only a else logical instruction, else logical is not validated',
    input: `
    @else {
    }
    `,
    expectError: true,
  },
  {
    name: 'When I use only a else if logical instruction, else if logical is not validated',
    input: `
    @else if (a == b) {
    }
    `,
    expectError: true,
  },
  {
    name: 'When I use only a else if and else logical instruction, else if logical is not validated',
    input: `
    @else if (a == b) {
    } @else {
    }
    `,
    expectError: true,
  },
]
