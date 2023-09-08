import type { Fixture } from '../../types/fixture'

export const importInstructionsFixtures: Fixture[] = [
  {
    name: 'When I use a named import, import is validated',
    input: `
    - import { Foo } from './Foo'
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ImportInstruction',
          from: './Foo',
          imports: [
            {
              $type: 'NamedImport',
              name: 'Foo',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'When I use a multiple named import, import is validated',
    input: `
    - import { Foo, Bar } from './Foo'
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ImportInstruction',
          from: './Foo',
          imports: [
            {
              $type: 'NamedImport',
              name: 'Foo',
            },
            {
              $type: 'NamedImport',
              name: 'Bar',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'When I use a named import with alias, import is validated',
    input: `
    - import { Foo as Bar } from './Foo'
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ImportInstruction',
          from: './Foo',
          imports: [
            {
              $type: 'NamedImport',
              name: 'Foo',
              alias: 'Bar',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'When I use a namespace import, import is validated',
    input: `
    - import * as Foo from './Foo'
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ImportInstruction',
          from: './Foo',
          imports: [
            {
              $type: 'NamespaceImport',
              name: 'Foo',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'When I use a default import, import is validated',
    input: `
    - import Foo from './Foo'
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ImportInstruction',
          from: './Foo',
          imports: [
            {
              $type: 'DefaultImport',
              name: 'Foo',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'When I use a side-effect import, import is validated',
    input: `
    - import './Foo'
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ImportInstruction',
          from: './Foo',
        },
      ],
    },
  },
  {
    name: 'When I use multiple imports, import is validated',
    input: `
    - import Foo from './Foo'
    - import Bar from './Bar'
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ImportInstruction',
          from: './Foo',
          imports: [
            {
              $type: 'DefaultImport',
              name: 'Foo',
            },
          ],
        },
        {
          $type: 'ImportInstruction',
          from: './Bar',
          imports: [
            {
              $type: 'DefaultImport',
              name: 'Bar',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'When I use multiple inline imports, import is validated',
    input: `
    - import Foo, { Bar } from './FooBar'
    `,
    expectedTree: {
      $type: 'Kaz',
      instructions: [
        {
          $type: 'ImportInstruction',
          from: './FooBar',
          imports: [
            {
              $type: 'DefaultImport',
              name: 'Foo',
            },
            {
              $type: 'NamedImport',
              name: 'Bar',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'When I use a named import without a path, import is not validated',
    input: `
    - import { Foo }
    `,
    expectError: true,
  },
  {
    name: 'When I use a multiple named import without comma, import is not validated',
    input: `
    - import { Foo Bar } from './Foo'
    `,
    expectError: true,
  },
  {
    name: 'When I use a named import without left curly brace, import is not validated',
    input: `
    - import Foo } from './Foo'
    `,
    expectError: true,
  },
  {
    name: 'When I use a named import without right curly brace, import is not validated',
    input: `
    - import { Foo from './Foo'
    `,
    expectError: true,
  },
  {
    name: 'When I use an import without opening single quote, import is not validated',
    input: `
    - import Foo from ./Foo'
    `,
    expectError: true,
  },
  {
    name: 'When I use an import without closing single quote, import is not validated',
    input: `
    - import Foo from './Foo
    `,
    expectError: true,
  },
  {
    name: 'When I use just the import keyword, import is not validated',
    input: `
    - import
    `,
    expectError: true,
  },
  {
    name: 'When I use just the import and from keywords, import is not validated',
    input: `
    - import from
    `,
    expectError: true,
  },
]
