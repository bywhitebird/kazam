import { type Token, parse as _parse, tokenize as _tokenize, ParserError } from './lib/voltair'
import type { KazAst } from './types/KazAst'
import config from './voltair.config'

export const tokenize = (input: string) => {
  return _tokenize(input, config.tokens, config.defaultBreakingPatterns)
}

export const parse = (tokens: Token[]) => {
  return _parse(tokens, config.entry) as ParserError | KazAst | undefined
}
