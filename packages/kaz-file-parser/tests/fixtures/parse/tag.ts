import type { JsonValue } from '../../../src/lib/voltair/types/JsonValue'

export const tagFixtures: (
  {
    name: string
    input: string
  } & (
    | { expectedTree: JsonValue }
    | { expectError: boolean }
  )
)[] = [
  {
    name: 'When I use a tag, tag is validated',
    input: `
    p () {}
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'Tag',
          tagName: 'p',
          attributes: [],
          children: [],
        },
      ],
    },
  },
  {
    name: 'When I use a tag with string attribute, tag is validated',
    input: `
    p (a = "b") {}
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'Tag',
          tagName: 'p',
          attributes: [
            {
              $type: 'TagAttribute',
              name: 'a',
              value: 'b',
            },
          ],
          children: [],
        },
      ],
    },
  },
  {
    name: 'When I use a tag with boolean attribute, tag is validated',
    input: `
    p (a) {}
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'Tag',
          tagName: 'p',
          attributes: [
            {
              $type: 'TagAttribute',
              name: 'a',
              value: true,
            },
          ],
          children: [],
        },
      ],
    },
  },
  {
    name: 'When I use a tag with expression attribute, tag is validated',
    input: `
    p (a = {b}) {}
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'Tag',
          tagName: 'p',
          attributes: [
            {
              $type: 'TagAttribute',
              name: 'a',
              expression: 'b',
            },
          ],
          children: [],
        },
      ],
    },
  },
  {
    name: 'When I use a tag with multiple attributes, tag is validated',
    input: `
    p (a = {b}, c = {d}) {}
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'Tag',
          tagName: 'p',
          attributes: [
            {
              $type: 'TagAttribute',
              name: 'a',
              expression: 'b',
            },
            {
              $type: 'TagAttribute',
              name: 'c',
              expression: 'd',
            },
          ],
          children: [],
        },
      ],
    },
  },
  {
    name: 'When I use a tag with children, tag is validated',
    input: `
    p (a = "b", c = {d}) {
      div () {}
    }
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'Tag',
          tagName: 'p',
          attributes: [
            {
              $type: 'TagAttribute',
              name: 'a',
              value: 'b',
            },
            {
              $type: 'TagAttribute',
              name: 'c',
              expression: 'd',
            },
          ],
          children: [
            {
              $type: 'Tag',
              tagName: 'div',
              attributes: [],
              children: [],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'When I use a tag with children, attributes and text, tag is validated',
    input: `
      p (a = "b", c = {d}) {
        div () {
          Hello world!
        }
      }
      `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'Tag',
          tagName: 'p',
          attributes: [
            {
              $type: 'TagAttribute',
              name: 'a',
              value: 'b',
            },
            {
              $type: 'TagAttribute',
              name: 'c',
              expression: 'd',
            },
          ],
          children: [
            {
              $type: 'Tag',
              tagName: 'div',
              attributes: [],
              children: [
                {
                  $type: 'Text',
                  text: 'Hello',
                },
                {
                  $type: 'Text',
                  text: 'world!',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'When I use a tag with an expression as children, tag is correctly tokenized',
    input: `
    p () {
      \${anExpression}
    }
    `,
    expectedTree: {
      $type: 'Kaz',
      template: [
        {
          $type: 'Tag',
          tagName: 'p',
          attributes: [],
          children: [
            {
              $type: 'Expression',
              expression: 'anExpression',
            },
          ],
        },
      ],
    },
  },
]
