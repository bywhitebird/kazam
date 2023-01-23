import { isIdentifierToken } from '../../../src/tokens/IdentifierToken'
import { isEndInstructionToken } from '../../../src/tokens/instructions/EndInstructionToken'
import { isAliasKeywordNamedImportToken } from '../../../src/tokens/instructions/imports/AliasKeywordNamedImportToken'
import { isFromKeywordImportToken } from '../../../src/tokens/instructions/imports/FromKeywordImportToken'
import { isImportInstructionToken } from '../../../src/tokens/instructions/imports/ImportInstructionToken'
import { isWildcardCharacterImportToken } from '../../../src/tokens/instructions/imports/WildcardCharacterImportToken'
import { isStartInstructionToken } from '../../../src/tokens/instructions/StartInstructionToken'
import { isCommaToken } from '../../../src/tokens/punctuations/CommaToken'
import { isLeftCurlyBracketToken } from '../../../src/tokens/punctuations/curly-brackets/LeftCurlyBracketToken'
import { isRightCurlyBracketToken } from '../../../src/tokens/punctuations/curly-brackets/RightCurlyBracketToken'
import { isSingleQuoteToken } from '../../../src/tokens/punctuations/quotes/SingleQuoteToken'
import { isSingleQuotedStringToken } from '../../../src/tokens/string-literals/SingleQuotedStringToken'
import type { Token } from '../../../src/types/Token'

export const importInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: (token: Token) => boolean
    value?: string
  }[]
})[] = [
  {
    name: 'When I use a named import, import is correctly tokenized',
    input: `
    - import { Foo } from './Foo'
    `,
    expectedTokenCheckers: [
      { checker: isStartInstructionToken, value: '-' },
      { checker: isImportInstructionToken, value: 'import' },
      { checker: isLeftCurlyBracketToken, value: '{' },
      { checker: isIdentifierToken, value: 'Foo' },
      { checker: isRightCurlyBracketToken, value: '}' },
      { checker: isFromKeywordImportToken, value: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, value: './Foo' },
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
      { checker: isStartInstructionToken, value: '-' },
      { checker: isImportInstructionToken, value: 'import' },
      { checker: isLeftCurlyBracketToken, value: '{' },
      { checker: isIdentifierToken, value: 'Foo' },
      { checker: isCommaToken, value: ',' },
      { checker: isIdentifierToken, value: 'Bar' },
      { checker: isRightCurlyBracketToken, value: '}' },
      { checker: isFromKeywordImportToken, value: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, value: './Foo' },
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
      { checker: isStartInstructionToken, value: '-' },
      { checker: isImportInstructionToken, value: 'import' },
      { checker: isLeftCurlyBracketToken, value: '{' },
      { checker: isIdentifierToken, value: 'Foo' },
      { checker: isAliasKeywordNamedImportToken, value: 'as' },
      { checker: isIdentifierToken, value: 'Bar' },
      { checker: isRightCurlyBracketToken, value: '}' },
      { checker: isFromKeywordImportToken, value: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, value: './Foo' },
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
      { checker: isStartInstructionToken, value: '-' },
      { checker: isImportInstructionToken, value: 'import' },
      { checker: isWildcardCharacterImportToken, value: '*' },
      { checker: isAliasKeywordNamedImportToken, value: 'as' },
      { checker: isIdentifierToken, value: 'Foo' },
      { checker: isFromKeywordImportToken, value: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, value: './Foo' },
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
      { checker: isStartInstructionToken, value: '-' },
      { checker: isImportInstructionToken, value: 'import' },
      { checker: isIdentifierToken, value: 'Foo' },
      { checker: isFromKeywordImportToken, value: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, value: './Foo' },
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
      { checker: isStartInstructionToken, value: '-' },
      { checker: isImportInstructionToken, value: 'import' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, value: './Foo' },
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
      { checker: isStartInstructionToken, value: '-' },
      { checker: isImportInstructionToken, value: 'import' },
      { checker: isIdentifierToken, value: 'Foo' },
      { checker: isFromKeywordImportToken, value: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, value: './Foo' },
      { checker: isSingleQuoteToken },
      { checker: isEndInstructionToken },
      { checker: isStartInstructionToken, value: '-' },
      { checker: isImportInstructionToken, value: 'import' },
      { checker: isIdentifierToken, value: 'Bar' },
      { checker: isFromKeywordImportToken, value: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, value: './Bar' },
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
      { checker: isStartInstructionToken, value: '-' },
      { checker: isImportInstructionToken, value: 'import' },
      { checker: isIdentifierToken, value: 'Foo' },
      { checker: isCommaToken, value: ',' },
      { checker: isLeftCurlyBracketToken, value: '{' },
      { checker: isIdentifierToken, value: 'Bar' },
      { checker: isRightCurlyBracketToken, value: '}' },
      { checker: isFromKeywordImportToken, value: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, value: './FooBar' },
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
      { checker: isStartInstructionToken, value: '-' },
      { checker: isImportInstructionToken, value: 'import' },
      { checker: isIdentifierToken, value: 'Foo' },
      { checker: isFromKeywordImportToken, value: 'from' },
      { checker: isSingleQuoteToken },
      { checker: isSingleQuotedStringToken, value: './Foo' },
      { checker: isEndInstructionToken },
    ],
  },
]
