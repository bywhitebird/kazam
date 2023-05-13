import { paramCase } from 'param-case'

import type { TextMateCaptures, TextMateLanguage, TextMatePattern } from './types/textmate/TextMateLanguage'
import type { ExplorableEntity } from './utils/dig'
import { dig } from './utils/dig'
import { getFirstSequenceToken } from './utils/get-first-sequence-token'
import { getLastSequenceToken } from './utils/get-last-sequence-token'
import { resolveValue } from './utils/resolve-value'
import { sequenceToRegex } from './utils/sequence-to-regex'

import { type Group, GroupParent, type GroupValue, Sequence, Token, s } from '.'

function filterUndefined<T>(array: (T | undefined)[]): NonNullable<T>[] {
  return array.filter((item): item is NonNullable<T> => item !== undefined)
}

type SequenceItem = Token | Sequence | Group | GroupParent | GroupValue

function sortTokens(tokensToSort: Token[], sortedTokens: Token[]) {
  return tokensToSort.sort((a, b) => {
    const aIndex = sortedTokens.indexOf(a)
    const bIndex = sortedTokens.indexOf(b)

    if (aIndex === -1)
      return 1

    if (bIndex === -1)
      return -1

    return bIndex - aIndex
  })
}

function generateTokenPattern(token: Token): TextMatePattern | undefined {
  if (token.tmScope === undefined)
    return

  if (token.tmMatch === undefined)
    return

  return {
    match: token.tmMatch,
    name: token.tmScope,
  }
}

function sortSequenceChildren(children: (SequenceItem | (() => SequenceItem))[], sortedTokens: Token[]): NonNullable<ExplorableEntity>[] {
  const resolvedChildren = children.map((item) => {
    const resolvedItem = resolveValue(item)

    if (resolvedItem instanceof Sequence || resolvedItem instanceof Token)
      return resolvedItem

    return dig(resolvedItem)
  })

  const sequences = resolvedChildren.filter((item): item is Sequence => item instanceof Sequence)
  const tokens = resolvedChildren.filter((item): item is Token => item instanceof Token)

  return [
    ...sequences,
    ...sortTokens(tokens, sortedTokens),
  ]
}

function countDeepBegin(
  pattern: TextMatePattern,
  repositories: Record<string, TextMatePattern>,
  alreadyVisited: Set<TextMatePattern | (() => TextMatePattern)> = new Set(),
  deepCount = 0,
): number {
  if (alreadyVisited.has(pattern))
    return Infinity

  const newAlreadyVisited = new Set(alreadyVisited).add(pattern)

  if ('include' in pattern) {
    const patternFromRepository = repositories[pattern.include.replace('#', '')]

    if (patternFromRepository === undefined)
      return deepCount

    return countDeepBegin(patternFromRepository, repositories, newAlreadyVisited, deepCount)
  }

  if ('begin' in pattern && pattern.begin !== undefined)
    deepCount++

  return pattern.patterns?.reduce((acc, pattern) => {
    return acc + countDeepBegin(pattern, repositories, newAlreadyVisited, deepCount)
  }, deepCount) ?? deepCount
}

function sortPatterns(patterns: TextMatePattern[], repositories: Record<string, TextMatePattern>): TextMatePattern[] {
  const { patternsWithBeginEnd, patternsWithoutBeginEnd } = patterns.reduce<{
    patternsWithBeginEnd: TextMatePattern[]
    patternsWithoutBeginEnd: TextMatePattern[]
  }>((acc, pattern) => {
    if (countDeepBegin(pattern, repositories) > 0)
      acc.patternsWithBeginEnd.push(pattern)
    else
      acc.patternsWithoutBeginEnd.push(pattern)

    return acc
  }, {
    patternsWithBeginEnd: [],
    patternsWithoutBeginEnd: [],
  })

  return [
    ...patternsWithBeginEnd,
    ...patternsWithoutBeginEnd,
  ]
}

function generateSequenceChildrenPatternsReducer(
  sortedTokens: Token[],
  alreadyGeneratedItems: Set<SequenceItem>,
  repositories: Record<string, TextMatePattern>,
  ignoredSequences: (Token | Sequence)[] = [],
) {
  return (acc: TextMatePattern[], child: NonNullable<ExplorableEntity>): TextMatePattern[] => {
    // if (alreadyGeneratedItems.has(child))
    //   return acc

    if (alreadyGeneratedItems.has(child)) {
      if (child instanceof Sequence && 'tmName' in child && child.tmName !== undefined)
        return filterUndefined([{ include: `#${child.tmName}` }, ...acc])

      return acc
    }

    if (child instanceof Sequence) {
      if ('tmName' in child && child.tmName !== undefined) {
        if (!(child.tmName in repositories)) {
          const pattern = generatePattern(child, sortedTokens, alreadyGeneratedItems, repositories, ignoredSequences)

          if (pattern !== undefined)
            repositories[child.tmName] = pattern
        }

        return filterUndefined([{ include: `#${child.tmName}` }, ...acc])
      }

      return filterUndefined([generatePattern(child, sortedTokens, alreadyGeneratedItems, repositories, ignoredSequences), ...acc])
    }

    if (child instanceof Token)
      return filterUndefined([generatePattern(child, sortedTokens, alreadyGeneratedItems, repositories, ignoredSequences), ...acc])

    return acc
  }
}

function generateSequencePattern(
  sequence: Sequence,
  sortedTokens: Token[],
  alreadyGeneratedItems: Set<SequenceItem>,
  repositories: Record<string, TextMatePattern>,
  ignoredSequences: (Token | Sequence)[] = [],
): TextMatePattern | undefined {
  if ('union' in sequence.modifiers) {
    const patterns = sortPatterns(
      sortSequenceChildren(
        [
          ...sequence.sequence,
          ...sequence.modifiers.union,
        ]
          .map((child) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { union: _, ...modifiers } = sequence.modifiers as Sequence['modifiers'] & { union: Sequence['sequence'] }
            return s(child, modifiers)
          }),
        sortedTokens,
      )
        .reduce<TextMatePattern[]>(
          generateSequenceChildrenPatternsReducer(sortedTokens, alreadyGeneratedItems, repositories, ignoredSequences),
          [],
        ),
      repositories,
    )

    return { patterns }
  }

  if (sequence.sequence.length === 1 && sequence.sequence[0] instanceof Sequence)
    return generatePattern(sequence.sequence[0], sortedTokens, alreadyGeneratedItems, repositories, ignoredSequences)

  const possibleFirstTokensOrSequences = getFirstSequenceToken(sequence).filter(token => 'tmScope' in token)
  const possibleLastTokensOrSequences = getLastSequenceToken(sequence).filter(token => 'tmScope' in token)

  const possibleFirstTokens = possibleFirstTokensOrSequences.filter((token): token is Token => token instanceof Token)
  const possibleLastTokens = possibleLastTokensOrSequences.filter((token): token is Token => token instanceof Token)
  const possibleFirstSequences = possibleFirstTokensOrSequences.filter((token): token is Sequence => token instanceof Sequence)
  const possibleLastSequences = possibleLastTokensOrSequences.filter((token): token is Sequence => token instanceof Sequence)

  if (
    sequence.tmScope === undefined
    || possibleFirstTokensOrSequences.length === 0
    || possibleLastTokensOrSequences.length === 0
  ) {
    const patterns = sortPatterns(
      sortSequenceChildren(sequence.sequence, sortedTokens)
        .reduce<TextMatePattern[]>(
          generateSequenceChildrenPatternsReducer(sortedTokens, alreadyGeneratedItems, repositories, ignoredSequences),
          [],
        ),
      repositories,
    )

    return { patterns }
  }

  if (
    possibleFirstTokensOrSequences.length === 1 && possibleLastTokensOrSequences.length === 1
    && possibleFirstTokensOrSequences[0] !== undefined
    && possibleLastTokensOrSequences[0] !== undefined
    && possibleFirstTokensOrSequences[0] === possibleLastTokensOrSequences[0]
  )
    return generatePattern(possibleFirstTokensOrSequences[0], sortedTokens, alreadyGeneratedItems, repositories, ignoredSequences)

  if ([...possibleFirstTokens, ...possibleLastTokens].some(token => token.tmMatch === undefined))
    return

  const patterns = sortPatterns(
    sortSequenceChildren(sequence.sequence, sortedTokens)
      .reduce<TextMatePattern[]>(
        generateSequenceChildrenPatternsReducer(
          sortedTokens,
          alreadyGeneratedItems,
          repositories,
          ignoredSequences.concat(possibleFirstTokensOrSequences, possibleLastTokensOrSequences),
        ),
        [],
      ),
    repositories,
  )

  console.log('Found sequence with begin and end', sequence)
  const patternBeginEnd = generatePatternBeginEnd(possibleFirstTokensOrSequences, possibleLastTokensOrSequences)
  // TODO: create a function to generate an object with begin, end, beginCaptures, endCaptures

  return {
    name: sequence.tmScope,
    // begin: possibleFirstTokens.map(token => `(${token.tmMatch})`).join('|'),
    // end: possibleLastTokens.map(token => `(${token.tmMatch})`).join('|'),
    // beginCaptures: possibleFirstTokens.reduce<TextMateCaptures>((acc, token, index) => ({
    //   ...acc,
    //   [index + 1]: {
    //     name: token.tmScope,
    //   },
    // }), {}),
    // endCaptures: possibleLastTokens.reduce<TextMateCaptures>((acc, token, index) => ({
    //   ...acc,
    //   [index + 1]: {
    //     name: token.tmScope,
    //   },
    // }), {}),
    ...patternBeginEnd,
    applyEndPatternLast: 1,
    patterns,
  }
}

function generatePattern(
  sequence: NonNullable<ExplorableEntity>,
  sortedTokens: Token[],
  alreadyGeneratedItems: Set<SequenceItem>,
  repositories: Record<string, TextMatePattern>,
  ignoredSequences: (Token | Sequence)[] = [],
): TextMatePattern | undefined {
  if (sequence instanceof Sequence)
    return generateSequencePattern(sequence, sortedTokens, alreadyGeneratedItems.add(sequence), repositories, ignoredSequences)

  if (ignoredSequences.includes(sequence))
    return

  return generateTokenPattern(sequence)
}

export const generateTm = (languageName: string, sequence: Sequence | GroupParent, sortedTokens: Token[]): TextMateLanguage => {
  const scopeName = `source.${paramCase(languageName)}` as const

  const root = sequence instanceof GroupParent ? dig(sequence) : sequence

  if (root === undefined)
    throw new Error('Root is undefined')

  const repositories: Record<string, TextMatePattern> = {}
  const rootPattern = generatePattern(root, sortedTokens, new Set(), repositories)

  if (rootPattern === undefined)
    throw new Error('Could not generate root pattern')

  return {
    $schema: 'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json',
    name: languageName,
    scopeName,
    patterns: [rootPattern],
    repository: repositories,
  }
}
function generatePatternBeginEnd(possibleFirstTokensOrSequences: (Token | Sequence)[], possibleLastTokensOrSequences: (Token | Sequence)[]) {
  const generateCaptures = <K extends string, KC extends string>(
    key: K,
    keyCapture: KC,
    tokens: (Token | Sequence)[],
  ) => tokens.reduce<{ [key in K]: string } & { [keyCapture in KC]: TextMateCaptures }>((acc, token, index) => {
    if (token instanceof Sequence) {
      console.log('Find pattern for', token)
      return {
        [key]: `${acc[key]}${index === 0 ? '' : '|'}(${sequenceToRegex(token)})`,
        [keyCapture]: {
          ...<TextMateCaptures>acc[keyCapture],
          [index + 1]: {
            patterns: (token.tmScope && token.tmScope !== '')
              ? [{
                  include: `#${token.tmScope}`,
                }]
              : [],
          },
        },
      } as any
    }

    return {
      [key]: `${acc[key]}${index === 0 ? '' : '|'}(${token.tmMatch})`,
      [keyCapture]: {
        ...<TextMateCaptures>acc[keyCapture],
        [index + 1]: {
          name: token.tmScope,
        },
      },
    } as any
  }, {
    [key]: '',
    [keyCapture]: {},
  } as any)

  const { begin, beginCaptures } = generateCaptures('begin', 'beginCaptures', possibleFirstTokensOrSequences)
  const { end, endCaptures } = generateCaptures('end', 'endCaptures', possibleLastTokensOrSequences)

  return {
    begin,
    beginCaptures,
    end,
    endCaptures,
  }
}
