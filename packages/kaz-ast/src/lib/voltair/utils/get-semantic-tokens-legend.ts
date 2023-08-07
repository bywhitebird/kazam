import type { Token } from '../Token'

// https://github.com/microsoft/vscode-languageserver-node/blob/1320922f95ef182df2cf76b7c96b1a2d3ba14c2a/types/src/main.ts#L3625-L3635
export interface SemanticTokensLegend {
  /**
   * The token types a server uses.
   */
  tokenTypes: string[]
  /**
   * The token modifiers a server uses.
   */
  tokenModifiers: string[]
}

export const getSemanticTokensLegend = (tokens: Token[]): SemanticTokensLegend & { textmateScopeMappings: Record<string, string[]> } => {
  const { tokenTypes, tokenModifiers, textmateScopeMappings } = tokens.reduce((legend, token) => {
    const tokenType = token.semantic?.type
    const tokenModifiers = token.semantic?.modifiers
    const textmateScope = (token.semantic !== undefined && 'textmateScope' in token.semantic)
      ? token.semantic.textmateScope
      : undefined

    if (tokenType !== undefined) {
      legend.tokenTypes.add(tokenType)

      if (textmateScope !== undefined)
        legend.textmateScopeMappings.set(`${tokenType}${tokenModifiers !== undefined ? `.${tokenModifiers.join('.')}` : ''}`, textmateScope)
    }

    if (tokenModifiers !== undefined)
      tokenModifiers.forEach(tokenModifier => legend.tokenModifiers.add(tokenModifier))

    return legend
  }, { tokenTypes: new Set<string>(), tokenModifiers: new Set<string>(), textmateScopeMappings: new Map<string, string[]>() })

  return {
    tokenTypes: Array.from(tokenTypes),
    tokenModifiers: Array.from(tokenModifiers),
    textmateScopeMappings: Object.fromEntries(textmateScopeMappings),
  }
}
