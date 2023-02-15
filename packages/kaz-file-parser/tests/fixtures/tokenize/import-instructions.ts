import type { Token } from '../../../src/lib/voltair'
import { isIdentifierToken } from '../../../src/tokens/IdentifierToken'
import { isEndInstructionToken } from '../../../src/tokens/instructions/EndInstructionToken'
import { isAliasKeywordNamedImportToken } from '../../../src/tokens/instructions/import/AliasKeywordNamedImportToken'
import { isFromKeywordImportToken } from '../../../src/tokens/instructions/import/FromKeywordImportToken'
import { isImportInstructionToken } from '../../../src/tokens/instructions/import/ImportInstructionToken'
import { isWildcardCharacterImportToken } from '../../../src/tokens/instructions/import/WildcardCharacterImportToken'
import { isStartInstructionToken } from '../../../src/tokens/instructions/StartInstructionToken'
import { isCommaToken } from '../../../src/tokens/punctuations/CommaToken'
import { isLeftCurlyBracketToken } from '../../../src/tokens/punctuations/curly-brackets/LeftCurlyBracketToken'
import { isRightCurlyBracketToken } from '../../../src/tokens/punctuations/curly-brackets/RightCurlyBracketToken'
import { isSingleQuoteToken } from '../../../src/tokens/punctuations/quotes/SingleQuoteToken'
import { isSingleQuotedStringToken } from '../../../src/tokens/string-literals/SingleQuotedStringToken'

export const importInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: (token: Token) => boolean
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
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isImportInstructionToken, rawValue: 'import' },
      { checker: isLeftCurlyBracketToken, rawValue: '{' },
      { checker: isIdentifierToken, rawValue: 'Foo' },
      { checker: isRightCurlyBracketToken, rawValue: '}' },
      { checker: isFromKeywordImportToken, rawValue: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, rawValue: './Foo' },
      { checker: isSingleQuoteToken },
      { checker: isEndInstructionToken },
    ],
  },
  {
    name: 'When I use a multiple named import, import is correctly tokenized',
    input: `
    - import { Foo, Bar } from './Foo'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isImportInstructionToken, rawValue: 'import' },
      { checker: isLeftCurlyBracketToken, rawValue: '{' },
      { checker: isIdentifierToken, rawValue: 'Foo' },
      { checker: isCommaToken, rawValue: ',' },
      { checker: isIdentifierToken, rawValue: 'Bar' },
      { checker: isRightCurlyBracketToken, rawValue: '}' },
      { checker: isFromKeywordImportToken, rawValue: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, rawValue: './Foo' },
      { checker: isSingleQuoteToken },
      { checker: isEndInstructionToken },
    ],
  },
  {
    name: 'When I use a named import with alias, import is correctly tokenized',
    input: `
    - import { Foo as Bar } from './Foo'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isImportInstructionToken, rawValue: 'import' },
      { checker: isLeftCurlyBracketToken, rawValue: '{' },
      { checker: isIdentifierToken, rawValue: 'Foo' },
      { checker: isAliasKeywordNamedImportToken, rawValue: 'as' },
      { checker: isIdentifierToken, rawValue: 'Bar' },
      { checker: isRightCurlyBracketToken, rawValue: '}' },
      { checker: isFromKeywordImportToken, rawValue: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, rawValue: './Foo' },
      { checker: isSingleQuoteToken },
      { checker: isEndInstructionToken },
    ],
  },
  {
    name: 'When I use a namespace import, import is correctly tokenized',
    input: `
    - import * as Foo from './Foo'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isImportInstructionToken, rawValue: 'import' },
      { checker: isWildcardCharacterImportToken, rawValue: '*' },
      { checker: isAliasKeywordNamedImportToken, rawValue: 'as' },
      { checker: isIdentifierToken, rawValue: 'Foo' },
      { checker: isFromKeywordImportToken, rawValue: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, rawValue: './Foo' },
      { checker: isSingleQuoteToken },
      { checker: isEndInstructionToken },
    ],
  },
  {
    name: 'When I use a default import, import is correctly tokenized',
    input: `
    - import Foo from './Foo'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isImportInstructionToken, rawValue: 'import' },
      { checker: isIdentifierToken, rawValue: 'Foo' },
      { checker: isFromKeywordImportToken, rawValue: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, rawValue: './Foo' },
      { checker: isSingleQuoteToken },
      { checker: isEndInstructionToken },
    ],
  },
  {
    name: 'When I use a side-effect import, import is correctly tokenized',
    input: `
    - import './Foo'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isImportInstructionToken, rawValue: 'import' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, rawValue: './Foo' },
      { checker: isSingleQuoteToken },
      { checker: isEndInstructionToken },
    ],
  },
  {
    name: 'When I use multiple imports, imports are correctly tokenized',
    input: `
    - import Foo from './Foo'
    - import Bar from './Bar'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isImportInstructionToken, rawValue: 'import' },
      { checker: isIdentifierToken, rawValue: 'Foo' },
      { checker: isFromKeywordImportToken, rawValue: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, rawValue: './Foo' },
      { checker: isSingleQuoteToken },
      { checker: isEndInstructionToken },
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isImportInstructionToken, rawValue: 'import' },
      { checker: isIdentifierToken, rawValue: 'Bar' },
      { checker: isFromKeywordImportToken, rawValue: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, rawValue: './Bar' },
      { checker: isSingleQuoteToken },
      { checker: isEndInstructionToken },
    ],
  },
  {
    name: 'When I use multiple inline imports, imports are correctly tokenized',
    input: `
    - import Foo, { Bar } from './FooBar'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isImportInstructionToken, rawValue: 'import' },
      { checker: isIdentifierToken, rawValue: 'Foo' },
      { checker: isCommaToken, rawValue: ',' },
      { checker: isLeftCurlyBracketToken, rawValue: '{' },
      { checker: isIdentifierToken, rawValue: 'Bar' },
      { checker: isRightCurlyBracketToken, rawValue: '}' },
      { checker: isFromKeywordImportToken, rawValue: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, rawValue: './FooBar' },
      { checker: isSingleQuoteToken },
      { checker: isEndInstructionToken },
    ],
  },
  {
    name: 'When I use an import without closing single quote, import is correctly tokenized',
    input: `
    - import Foo from './Foo
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, rawValue: '-' },
      { checker: isImportInstructionToken, rawValue: 'import' },
      { checker: isIdentifierToken, rawValue: 'Foo' },
      { checker: isFromKeywordImportToken, rawValue: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, rawValue: './Foo' },
      { checker: isEndInstructionToken },
    ],
  },
]
