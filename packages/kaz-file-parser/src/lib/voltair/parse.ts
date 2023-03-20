import { Group } from './groups/Group'
import { GroupParent } from './groups/GroupParent'
import { GroupValue } from './groups/GroupValue'
import type { JsonArray, JsonObject, JsonValue } from './types/JsonValue'
import { ExpectedTokenError, UnexpectedTokenError } from './utils/errors'
import { resolveValue } from './utils/resolve-value'

import { Sequence, Token } from '.'

type ParserError = ExpectedTokenError | UnexpectedTokenError
type ParserReturnType = ParserError | TreeValue | void

class TreeValue {
  private _value: JsonValue | TreeValue | TreeValue[]

  constructor(value: JsonValue | TreeValue | TreeValue[], protected forced = false) {
    this._value = value
  }

  public value(options: Partial<Group['options']> = {}): JsonValue | undefined {
    if (options.forceMultiple) {
      if (this._value instanceof TreeValue) {
        const value = this._value.value()
        return value === undefined ? undefined : [value]
      }

      if (TreeValue.isTreeValueArray(this._value))
        return this._value.flatMap(value => value.value({ forceMultiple: true })).filter((value): value is JsonValue => value !== undefined && value !== null)

      return [this._value]
    }

    if (this._value instanceof TreeValue)
      return this._value.value()

    if (TreeValue.isTreeValueArray(this._value)) {
      let values = this._value.filter(value => value.forced)

      if (values.length === 0)
        values = this._value

      if (values.length === 1)
        return values[0]?.value() ?? null

      let result: JsonObject | JsonArray | undefined

      for (const value of values) {
        const valueValue = value.value()

        if (valueValue === null || typeof valueValue !== 'object')
          continue

        if (result === undefined)
          result = valueValue
        else
          result = { ...result, ...valueValue }
      }

      return result
    }

    return this._value
  }

  static isTreeValueArray = (treeValue: unknown): treeValue is TreeValue[] => {
    return Array.isArray(treeValue) && treeValue.every(value => value instanceof TreeValue)
  }
}

class TokensConsumer {
  private consumedTokens: Token[] = []
  private tokens: Token[]

  constructor(tokens: Token[]) {
    this.tokens = tokens
  }

  public consumeToken(): Token | undefined {
    const token = this.tokens.shift()

    if (token)
      this.consumedTokens.push(token)

    return token
  }

  public consumeTokens(count: number): Token[] {
    const tokens = this.tokens.splice(0, count)

    this.consumedTokens.push(...tokens)

    return tokens
  }

  public unconsumeToken(): Token | undefined {
    const token = this.consumedTokens.pop()

    if (token)
      this.tokens.unshift(token)

    return token
  }

  public unconsumeTokens(count: number): Token[] {
    const tokens = this.consumedTokens.splice(-count, count)

    this.tokens.unshift(...tokens)

    return tokens
  }

  get length(): number {
    return this.tokens.length
  }

  get lastConsumedToken(): Token | undefined {
    return this.consumedTokens[this.consumedTokens.length - 1]
  }
}

const createTokensConsumer = (tokens: Token[]) => {
  return new TokensConsumer(tokens)
}

const getFirstSequenceToken = (sequence: Sequence['sequence'][number]): Token | undefined => {
  const resolvedSequence = resolveValue(sequence)

  if (resolvedSequence instanceof Sequence) {
    const firstToken = resolvedSequence.sequence[0]

    if (firstToken === undefined)
      return undefined

    return getFirstSequenceToken(firstToken)
  }

  if (resolvedSequence instanceof Group)
    return getFirstSequenceToken(resolvedSequence.child)

  if (resolvedSequence instanceof GroupParent)
    return getFirstSequenceToken(resolvedSequence.child)

  if (resolvedSequence instanceof GroupValue && (resolvedSequence.child instanceof Sequence || resolvedSequence.child instanceof Token))
    return getFirstSequenceToken(resolvedSequence.child)

  if (resolvedSequence instanceof Token)
    return resolvedSequence

  return undefined
}

export const parse = (tokens: Token[], expectedSequence: Sequence | GroupParent): ParserError | JsonValue | undefined => {
  const parse = (tokensConsumer: TokensConsumer, expected: Sequence | Token | Group | GroupParent | GroupValue): ParserReturnType => {
    if (expected instanceof GroupParent)
      return parseGroupParent(tokensConsumer, expected)

    if (expected instanceof Group)
      return parseGroup(tokensConsumer, expected)

    if (expected instanceof GroupValue)
      return parseGroupValue(tokensConsumer, expected)

    if (expected instanceof Token) {
      const result = parseToken(tokensConsumer.consumeToken(), expected)

      if (result instanceof UnexpectedTokenError)
        tokensConsumer.unconsumeToken()

      return result
    }

    if ('min' in expected.modifiers || 'max' in expected.modifiers)
      return parseSequenceMinMax(tokensConsumer, expected)

    if ('repeat' in expected.modifiers)
      return parseSequenceRepeat(tokensConsumer, expected)

    if ('optional' in expected.modifiers)
      return parseSequenceOptional(tokensConsumer, expected)

    if ('union' in expected.modifiers)
      return parseSequenceUnion(tokensConsumer, expected)

    const results: ParserReturnType[] = []
    for (const expectedSequenceOrToken of expected.sequence) {
      const result = parse(tokensConsumer, resolveValue(expectedSequenceOrToken))

      if (result instanceof Error)
        return result

      results.push(result)
    }

    return new TreeValue(results.flat().filter((result): result is TreeValue => result instanceof TreeValue))
  }

  function parseToken(token: Token | undefined, expectedToken: Token): ParserReturnType {
    if (token === undefined)
      return new ExpectedTokenError(expectedToken)

    if (expectedToken.$name !== token.$name)
      return new UnexpectedTokenError(token, [expectedToken])

    const value = token.$value
    if (value)
      return new TreeValue(value)
  }

  function parseGroupParent(tokensConsumer: TokensConsumer, expectedGroupParent: GroupParent): ParserReturnType {
    const result = parse(tokensConsumer, resolveValue(expectedGroupParent.child))

    if (result instanceof Error)
      return result

    const value = result?.value() ?? {}

    if (Array.isArray(value) || typeof value !== 'object')
      throw new Error('Expected group parent to return an object.')

    return new TreeValue({ ...value, $type: expectedGroupParent.$name })
  }

  function parseGroup(tokensConsumer: TokensConsumer, expectedGroup: Group): ParserReturnType {
    const result = parse(tokensConsumer, resolveValue(expectedGroup.child))

    if (result instanceof Error)
      return result

    const value = result?.value(expectedGroup.options) ?? {}

    return new TreeValue({ [expectedGroup.$name]: value })
  }

  function parseGroupValue(tokensConsumer: TokensConsumer, expectedGroupValue: GroupValue): ParserReturnType {
    const resolvedChild = resolveValue(expectedGroupValue.child)

    if (!(resolvedChild instanceof Sequence || resolvedChild instanceof Token))
      return new TreeValue(resolvedChild)

    const result = parse(tokensConsumer, resolvedChild)

    if (result instanceof Error)
      return result

    const value = result?.value() ?? {}

    return new TreeValue(value, true)
  }

  function parseSequenceMinMax(tokensConsumer: TokensConsumer, expectedSequence: Sequence): ParserReturnType {
    if (!('min' in expectedSequence.modifiers) && !('max' in expectedSequence.modifiers))
      throw new Error('Expected sequence to have a min or/and max modifier.')

    const { min, max } = expectedSequence.modifiers

    const sequenceToParse = { ...expectedSequence, modifiers: {} }

    let i = 0
    const results: ParserReturnType[] = []
    while (!(results.at(-1) instanceof Error)) {
      if (max && i >= max)
        break

      const beforeParseRemainingTokensNumber = tokensConsumer.length
      const result = parse(tokensConsumer, sequenceToParse)
      const afterParseRemainingTokensNumber = tokensConsumer.length

      if (result instanceof Error && beforeParseRemainingTokensNumber - afterParseRemainingTokensNumber > 0)
        return result

      results.push(result)
      i++
    }

    if (min !== undefined && i < min) {
      const expectedToken = getFirstSequenceToken(expectedSequence)

      if (expectedToken === undefined)
        throw new Error('Expected sequence to have at least one token.')

      return new ExpectedTokenError(expectedToken)
    }

    if (max !== undefined && i > max) {
      if (tokensConsumer.lastConsumedToken === undefined)
        throw new Error('Expected to have a last consumed token.')

      return new UnexpectedTokenError(tokensConsumer.lastConsumedToken)
    }

    return new TreeValue(results.flat().filter((result): result is TreeValue => result instanceof TreeValue))
  }

  function parseSequenceRepeat(tokensConsumer: TokensConsumer, expectedSequence: Sequence): ParserReturnType {
    if (!('repeat' in expectedSequence.modifiers))
      throw new Error('Expected sequence to have a repeat modifier.')

    const { repeat } = expectedSequence.modifiers

    const sequenceToParse = { ...expectedSequence, modifiers: { min: repeat, max: repeat } }

    return parseSequenceMinMax(tokensConsumer, sequenceToParse)
  }

  function parseSequenceOptional(tokensConsumer: TokensConsumer, expectedSequence: Sequence): ParserReturnType {
    if (!('optional' in expectedSequence.modifiers))
      throw new Error('Expected sequence to have an optional modifier.')

    const sequenceToParse = { sequence: expectedSequence.sequence, modifiers: { min: 0, max: 1 } }

    const result = parse(tokensConsumer, sequenceToParse)

    if (result instanceof Error)
      return result

    const value = result?.value()

    if (!(value instanceof Error) && value !== undefined)
      return new TreeValue(value)
  }

  function parseSequenceUnion(tokensConsumer: TokensConsumer, expectedSequence: Sequence): ParserReturnType {
    if (!('union' in expectedSequence.modifiers))
      throw new Error('Expected sequence to have a union modifier.')

    const unionSequences = [new Sequence(expectedSequence.sequence), ...expectedSequence.modifiers.union]

    let result: ParserReturnType
    for (const sequence of unionSequences) {
      const beforeParseRemainingTokensNumber = tokensConsumer.length
      result = parse(tokensConsumer, resolveValue(sequence))
      const afterParseRemainingTokensNumber = tokensConsumer.length

      if (result instanceof Error)
        tokensConsumer.unconsumeTokens(beforeParseRemainingTokensNumber - afterParseRemainingTokensNumber)
      else
        return result
    }

    return result
  }

  const tokensConsumer = createTokensConsumer(tokens)
  const result = parse(tokensConsumer, expectedSequence)

  const remainingToken = tokensConsumer.consumeToken()

  if (remainingToken)
    return new UnexpectedTokenError(remainingToken)

  if (result instanceof Error)
    return result

  if (result === undefined)
    return {}

  return result.value()
}
