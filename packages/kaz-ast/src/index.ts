import { parse as _parse, tokenize as _tokenize, getSemanticTokensLegend } from './lib/voltair'
import type { ParserError, Token } from './lib/voltair'
import type { KazAst } from './types/KazAst'
import config from './voltair.config'

export const tokenize = (input: string) => {
  return _tokenize(input, config.tokens, config.defaultBreakingPatterns)
}

export const parse = (tokens: Token[]) => {
  return _parse(tokens, config.entry) as ParserError | KazAst | undefined
}

export const semanticTokensLegend = getSemanticTokensLegend(config.tokens)

export * from './types/KazAst'

export { traverse } from './lib/traverse'
