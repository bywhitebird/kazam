import { type Sequence, createSequence } from '../../classes/Sequence'
import { Token } from '../../classes/Token'
import { ExpectedTokenError, UnexpectedTokenError } from '../../utils/errors'
import { getFirstSequenceToken } from './get-first-sequence-token'

type CheckerReturnType = UnexpectedTokenError | ExpectedTokenError | void

class TokensConsumer {
  private consumedTokens: Token[] = []

  constructor(private tokens: Token[]) {}

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
    return this.consumedTokens.splice(-count, count)
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

export const checkSequence = (tokens: Token[] | TokensConsumer, expectedSequence: Sequence, root = true): CheckerReturnType => {
  const tokensConsumer = tokens instanceof TokensConsumer
    ? tokens
    : createTokensConsumer(tokens)

  if ('min' in expectedSequence.modifiers || 'max' in expectedSequence.modifiers)
    return checkSequenceMinMax(tokensConsumer, expectedSequence)

  if ('repeat' in expectedSequence.modifiers)
    return checkSequenceRepeat(tokensConsumer, expectedSequence)

  if ('optional' in expectedSequence.modifiers)
    return checkSequenceOptional(tokensConsumer, expectedSequence)

  if ('union' in expectedSequence.modifiers)
    return checkSequenceUnion(tokensConsumer, expectedSequence)

  for (const expectedSequenceOrToken of expectedSequence.sequence) {
    let result: CheckerReturnType

    if (expectedSequenceOrToken instanceof Token) {
      result = checkToken(tokensConsumer.consumeToken(), expectedSequenceOrToken)

      if (result !== undefined)
        tokensConsumer.unconsumeToken()
    }
    else {
      result = checkSequence(tokensConsumer, expectedSequenceOrToken, false)
    }

    if (result !== undefined)
      return result
  }

  if (root) {
    const remainingToken = tokensConsumer.consumeToken()
    if (remainingToken)
      return new UnexpectedTokenError(remainingToken)
  }
}

function checkToken(token: Token | undefined, expectedToken: Token): CheckerReturnType {
  if (token === undefined)
    return new ExpectedTokenError(expectedToken)

  if (expectedToken.$name !== token.$name)
    return new UnexpectedTokenError(token, [expectedToken])
}

function checkSequenceMinMax(tokensConsumer: TokensConsumer, expectedSequence: Sequence): CheckerReturnType {
  if (!('min' in expectedSequence.modifiers) && !('max' in expectedSequence.modifiers))
    throw new Error('Expected sequence to have a min or/and max modifier.')

  const { min, max } = expectedSequence.modifiers

  const sequenceToCheck = { ...expectedSequence, modifiers: {} }

  let i = 0
  while (checkSequence(tokensConsumer, sequenceToCheck, false) === undefined) {
    if (max && i >= max)
      break

    i++
  }

  if (min && i < min) {
    const expectedToken = getFirstSequenceToken(expectedSequence)

    if (expectedToken === undefined)
      throw new Error('Expected sequence to have at least one token.')

    return new ExpectedTokenError(expectedToken)
  }

  if (max && i > max) {
    if (tokensConsumer.lastConsumedToken === undefined)
      throw new Error('Expected to have a last consumed token.')

    return new UnexpectedTokenError(tokensConsumer.lastConsumedToken)
  }
}

function checkSequenceRepeat(tokensConsumer: TokensConsumer, expectedSequence: Sequence): CheckerReturnType {
  if (!('repeat' in expectedSequence.modifiers))
    throw new Error('Expected sequence to have a repeat modifier.')

  const { repeat } = expectedSequence.modifiers

  const sequenceToCheck = { ...expectedSequence, modifiers: { min: repeat, max: repeat } }

  return checkSequenceMinMax(tokensConsumer, sequenceToCheck)
}

function checkSequenceOptional(tokensConsumer: TokensConsumer, expectedSequence: Sequence): CheckerReturnType {
  if (!('optional' in expectedSequence.modifiers))
    throw new Error('Expected sequence to have an optional modifier.')

  const sequenceToCheck = { sequence: expectedSequence.sequence, modifiers: { min: 0, max: 1 } }

  return checkSequence(tokensConsumer, sequenceToCheck, false)
}

function checkSequenceUnion(tokensConsumer: TokensConsumer, expectedSequence: Sequence): CheckerReturnType {
  if (!('union' in expectedSequence.modifiers))
    throw new Error('Expected sequence to have a union modifier.')

  const unionSequences = [createSequence(...expectedSequence.sequence), ...expectedSequence.modifiers.union]

  let result: CheckerReturnType
  for (const sequence of unionSequences) {
    if (sequence instanceof Token) {
      result = checkToken(tokensConsumer.consumeToken(), sequence)

      if (result !== undefined)
        tokensConsumer.unconsumeToken()
    }
    else {
      result = checkSequence(tokensConsumer, sequence, false)
    }
    if (result === undefined)
      return
  }

  return result
}
