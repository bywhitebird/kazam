import { type Token, parse as _parse, tokenize as _tokenize } from './lib/voltair'
import config from './voltair.config'

export const tokenize = (input: string) => {
  return _tokenize(input, config.tokens)
}

export const parse = (tokens: Token[]) => {
  return _parse(tokens, config.entry)
}
