import type { Token } from '../../types/Token'

export const getSequences = (tokens: Token[], startToken: Token | Token[], endToken: Token | Token[]) => {
  const startTokens = Array.isArray(startToken) ? startToken : [startToken]
  const endTokens = Array.isArray(endToken) ? endToken : [endToken]

  return tokens.reduce<(Token[] | undefined)[]>((acc, token, i, arr) => {
    const lastToken = acc[acc.length - 1]

    if (arr.slice(i, i + endTokens.length).every((t, j) => t.$name === endTokens[j]?.$name)) {
      if (!lastToken)
        return acc

      lastToken.push(token)
      return [...acc, undefined]
    }

    if (arr.slice(i, i + startTokens.length).every((t, j) => t.$name === startTokens[j]?.$name)) {
      if (!lastToken)
        return [...acc.slice(0, -1), [token]]

      // TODO: handle nested sequences
    }

    if (lastToken)
      lastToken.push(token)

    return acc
  }, []).filter(Boolean) as Token[][]
}
