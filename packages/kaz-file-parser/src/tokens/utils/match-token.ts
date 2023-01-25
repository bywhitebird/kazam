import * as Tokens from '..'
import type { Context } from '../../classes/Context'

const orderedTokens = [
  Tokens.StartInstructionToken,
  Tokens.EndInstructionToken,

  Tokens.ImportInstructionToken,
  Tokens.FromKeywordImportToken,
  Tokens.AliasKeywordNamedImportToken,
  Tokens.WildcardCharacterImportToken,

  Tokens.LeftCurlyBracketToken,
  Tokens.RightCurlyBracketToken,

  Tokens.SingleQuoteToken,
  Tokens.DoubleQuoteToken,

  Tokens.SingleQuotedStringToken,
  Tokens.DoubleQuotedStringToken,

  Tokens.CommaToken,
  Tokens.IdentifierToken,

  Tokens.WhitespaceToken,
  Tokens.TextToken,
]

if (new Set(orderedTokens.map(token => token.$name)).size !== orderedTokens.length)
  throw new Error('Tokens must have unique names')

export const matchToken = (word: string, contexts: Context[][]) => {
  const tokenFound = orderedTokens.find((token) => {
    if (!token.pattern.test(word))
      return false

    const lastContext = contexts[contexts.length - 1]

    if (lastContext?.some(context => context.forbiddenTokens?.find(forbiddenToken => forbiddenToken.$name === token.$name)))
      return false

    if (!token.inContexts || token.inContexts.length === 0)
      return true

    if (!lastContext)
      return false

    return token.inContexts.some(context => lastContext.some(openedContext => openedContext.$name === context.$name))
  })

  return tokenFound
}
