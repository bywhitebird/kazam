import type { KazAstType } from '../../../src/language-server/generated/ast'

export const importInstructionsFixtures = [
  {
    name: 'When I use a named import, import is in the AST',
    input: `
    - import { Foo } from './Foo'
    `,
    expectedOutput: <KazAstType['Import'][]>[{
      $type: 'Import',
      namedImports: {
        $type: 'NamedImports',
        namedImports: [{
          $type: 'NamedImport',
          name: 'Foo',
        }],
      },
      source: './Foo',
    }],
  },
  {
    name: 'When I use an aliased named import, import is in the AST',
    input: `
    - import { Foo as Bar } from './Foo'
    `,
    expectedOutput: <KazAstType['Import'][]>[{
      $type: 'Import',
      namedImports: {
        $type: 'NamedImports',
        namedImports: [{
          $type: 'NamedImport',
          alias: 'Bar',
          name: 'Foo',
        }],
      },
      source: './Foo',
    }],
  },
  {
    name: 'When I use multiple named imports, import is in the AST',
    input: `
    - import { Foo, Bar } from './Foo'
    `,
    expectedOutput: <KazAstType['Import'][]>[{
      $type: 'Import',
      namedImports: {
        $type: 'NamedImports',
        namedImports: [
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
      source: './Foo',
    }],
  },
  {
    name: 'When I use a string named import, import is in the AST',
    input: `
    - import { 'Foo Bar' as Baz } from './Foo'
    `,
    expectedOutput: <KazAstType['Import'][]>[{
      $type: 'Import',
      namedImports: {
        $type: 'NamedImports',
        namedImports: [{
          $type: 'NamedImport',
          alias: 'Baz',
          name: 'Foo Bar',
        }],
      },
      source: './Foo',
    }],
  },
  {
    name: 'When I use a default import, import is in the AST',
    input: `
    - import Foo from './Foo'
    `,
    expectedOutput: <KazAstType['Import'][]>[{
      $type: 'Import',
      defaultImport: {
        $type: 'DefaultImport',
        name: 'Foo',
      },
      source: './Foo',
    }],
  },
  {
    name: 'When I use a namespace import, import is in the AST',
    input: `
    - import * as Foo from './Foo'
    `,
    expectedOutput: <KazAstType['Import'][]>[{
      $type: 'Import',
      namespaceImport: {
        $type: 'NamespaceImport',
        alias: 'Foo',
      },
      source: './Foo',
    }],
  },
  {
    name: 'When I use a side-effect import, import is in the AST',
    input: `
    - import './Foo'
    `,
    expectedOutput: <KazAstType['Import'][]>[{
      $type: 'Import',
      source: './Foo',
    }],
  },
  {
    name: 'When I use multiple inlined imports, imports are in the AST',
    input: `
    - import { Foo, Bar as Baz }, * as Qux, Fred from './Foo'
    `,
    expectedOutput: <KazAstType['Import'][]>[{
      $type: 'Import',
      namedImports: {
        $type: 'NamedImports',
        namedImports: [
          {
            $type: 'NamedImport',
            name: 'Foo',
          },
          {
            $type: 'NamedImport',
            alias: 'Baz',
            name: 'Bar',
          },
        ],
      },
      namespaceImport: {
        $type: 'NamespaceImport',
        alias: 'Qux',
      },
      defaultImport: {
        $type: 'DefaultImport',
        name: 'Fred',
      },
    }],
  },
  {
    name: 'When I use multi-line imports, imports are in the AST',
    input: `
    - import { Foo } from './Foo'
    - import * as Bar from './Bar'
    `,
    expectedOutput: <KazAstType['Import'][]>[
      {
        $type: 'Import',
        namedImports: {
          namedImports: [{
            $type: 'NamedImport',
            name: 'Foo',
          }],
        },
      },
      {
        $type: 'Import',
        namespaceImport: {
          $type: 'NamespaceImport',
          alias: 'Bar',
        },
      },
    ],
  },
]
