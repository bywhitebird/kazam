import { AliasKeywordToken, FromKeywordToken, ImportInstructionToken, WildcardCharacterToken } from '../../../src/features/import-instruction'
import { EndInstructionToken, StartInstructionToken } from '../../../src/features/instruction'
import type { Token } from '../../../src/lib/voltair'
import { CommaToken, IdentifierToken, LeftCurlyBracketToken, RightCurlyBracketToken, SingleQuoteToken, SingleQuotedStringToken } from '../../../src/shared'

export const importInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: Token
    rawValue?: string
    value?: unknown
  }[]
})[] = [
  {
    name: 'When I use a named import, import is correctly tokenized',
    input: `
    - import { Foo } from './Foo'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ImportInstructionToken, rawValue: 'import' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: IdentifierToken, rawValue: 'Foo' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: FromKeywordToken, rawValue: 'from' },
      { checker: SingleQuoteToken },
      { checker: SingleQuotedStringToken, rawValue: './Foo' },
      { checker: SingleQuoteToken },
      { checker: EndInstructionToken },
    ],
  },
  {
    name: 'When I use a multiple named import, import is correctly tokenized',
    input: `
    - import { Foo, Bar } from './Foo'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ImportInstructionToken, rawValue: 'import' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: IdentifierToken, rawValue: 'Foo' },
      { checker: CommaToken, rawValue: ',' },
      { checker: IdentifierToken, rawValue: 'Bar' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: FromKeywordToken, rawValue: 'from' },
      { checker: SingleQuoteToken },
      { checker: SingleQuotedStringToken, rawValue: './Foo' },
      { checker: SingleQuoteToken },
      { checker: EndInstructionToken },
    ],
  },
  {
    name: 'When I use a named import with alias, import is correctly tokenized',
    input: `
    - import { Foo as Bar } from './Foo'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ImportInstructionToken, rawValue: 'import' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: IdentifierToken, rawValue: 'Foo' },
      { checker: AliasKeywordToken, rawValue: 'as' },
      { checker: IdentifierToken, rawValue: 'Bar' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: FromKeywordToken, rawValue: 'from' },
      { checker: SingleQuoteToken },
      { checker: SingleQuotedStringToken, rawValue: './Foo' },
      { checker: SingleQuoteToken },
      { checker: EndInstructionToken },
    ],
  },
  {
    name: 'When I use a namespace import, import is correctly tokenized',
    input: `
    - import * as Foo from './Foo'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ImportInstructionToken, rawValue: 'import' },
      { checker: WildcardCharacterToken, rawValue: '*' },
      { checker: AliasKeywordToken, rawValue: 'as' },
      { checker: IdentifierToken, rawValue: 'Foo' },
      { checker: FromKeywordToken, rawValue: 'from' },
      { checker: SingleQuoteToken },
      { checker: SingleQuotedStringToken, rawValue: './Foo' },
      { checker: SingleQuoteToken },
      { checker: EndInstructionToken },
    ],
  },
  {
    name: 'When I use a default import, import is correctly tokenized',
    input: `
    - import Foo from './Foo'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ImportInstructionToken, rawValue: 'import' },
      { checker: IdentifierToken, rawValue: 'Foo' },
      { checker: FromKeywordToken, rawValue: 'from' },
      { checker: SingleQuoteToken },
      { checker: SingleQuotedStringToken, rawValue: './Foo' },
      { checker: SingleQuoteToken },
      { checker: EndInstructionToken },
    ],
  },
  {
    name: 'When I use a side-effect import, import is correctly tokenized',
    input: `
    - import './Foo'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ImportInstructionToken, rawValue: 'import' },
      { checker: SingleQuoteToken },
      { checker: SingleQuotedStringToken, rawValue: './Foo' },
      { checker: SingleQuoteToken },
      { checker: EndInstructionToken },
    ],
  },
  {
    name: 'When I use multiple imports, imports are correctly tokenized',
    input: `
    - import Foo from './Foo'
    - import Bar from './Bar'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ImportInstructionToken, rawValue: 'import' },
      { checker: IdentifierToken, rawValue: 'Foo' },
      { checker: FromKeywordToken, rawValue: 'from' },
      { checker: SingleQuoteToken },
      { checker: SingleQuotedStringToken, rawValue: './Foo' },
      { checker: SingleQuoteToken },
      { checker: EndInstructionToken },
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ImportInstructionToken, rawValue: 'import' },
      { checker: IdentifierToken, rawValue: 'Bar' },
      { checker: FromKeywordToken, rawValue: 'from' },
      { checker: SingleQuoteToken },
      { checker: SingleQuotedStringToken, rawValue: './Bar' },
      { checker: SingleQuoteToken },
      { checker: EndInstructionToken },
    ],
  },
  {
    name: 'When I use multiple inline imports, imports are correctly tokenized',
    input: `
    - import Foo, { Bar } from './FooBar'
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ImportInstructionToken, rawValue: 'import' },
      { checker: IdentifierToken, rawValue: 'Foo' },
      { checker: CommaToken, rawValue: ',' },
      { checker: LeftCurlyBracketToken, rawValue: '{' },
      { checker: IdentifierToken, rawValue: 'Bar' },
      { checker: RightCurlyBracketToken, rawValue: '}' },
      { checker: FromKeywordToken, rawValue: 'from' },
      { checker: SingleQuoteToken },
      { checker: SingleQuotedStringToken, rawValue: './FooBar' },
      { checker: SingleQuoteToken },
      { checker: EndInstructionToken },
    ],
  },
  {
    name: 'When I use an import without closing single quote, import is correctly tokenized',
    input: `
    - import Foo from './Foo
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: ImportInstructionToken, rawValue: 'import' },
      { checker: IdentifierToken, rawValue: 'Foo' },
      { checker: FromKeywordToken, rawValue: 'from' },
      { checker: SingleQuoteToken },
      { checker: SingleQuotedStringToken, rawValue: './Foo' },
      { checker: EndInstructionToken },
    ],
  },
]
