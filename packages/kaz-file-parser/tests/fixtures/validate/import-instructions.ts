export const importInstructionsFixtures: ({
  name: string
  input: string
  isValid: boolean
})[] = [
  {
    name: 'When I use a named import, import is validated',
    input: `
    - import { Foo } from './Foo'
    `,
    isValid: true,
  },
  {
    name: 'When I use a multiple named import, import is validated',
    input: `
    - import { Foo, Bar } from './Foo'
    `,
    isValid: true,
  },
  {
    name: 'When I use a named import with alias, import is validated',
    input: `
    - import { Foo as Bar } from './Foo'
    `,
    isValid: true,
  },
  {
    name: 'When I use a namespace import, import is validated',
    input: `
    - import * as Foo from './Foo'
    `,
    isValid: true,
  },
  {
    name: 'When I use a default import, import is validated',
    input: `
    - import Foo from './Foo'
    `,
    isValid: true,
  },
  {
    name: 'When I use a side-effect import, import is validated',
    input: `
    - import './Foo'
    `,
    isValid: true,
  },
  {
    name: 'When I use multiple imports, import is validated',
    input: `
    - import Foo from './Foo'
    - import Bar from './Bar'
    `,
    isValid: true,
  },
  {
    name: 'When I use multiple inline imports, import is validated',
    input: `
    - import Foo, { Bar } from './FooBar'
    `,
    isValid: true,
  },
  {
    name: 'When I use a named import without a path, import is not validated',
    input: `
    - import { Foo }
    `,
    isValid: false,
  },
  {
    name: 'When I use a multiple named import without comma, import is not validated',
    input: `
    - import { Foo Bar } from './Foo'
    `,
    isValid: false,
  },
  {
    name: 'When I use a named import without left curly brace, import is not validated',
    input: `
    - import Foo } from './Foo'
    `,
    isValid: false,
  },
  {
    name: 'When I use a named import without right curly brace, import is not validated',
    input: `
    - import { Foo from './Foo'
    `,
    isValid: false,
  },
  {
    name: 'When I use an import without opening single quote, import is not validated',
    input: `
    - import Foo from ./Foo'
    `,
    isValid: false,
  },
  {
    name: 'When I use an import without closing single quote, import is not validated',
    input: `
    - import Foo from './Foo
    `,
    isValid: false,
  },
  {
    name: 'When I use just the import keyword, import is not validated',
    input: `
    - import
    `,
    isValid: false,
  },
  {
    name: 'When I use just the import and from keywords, import is not validated',
    input: `
    - import from
    `,
    isValid: false,
  },
]
