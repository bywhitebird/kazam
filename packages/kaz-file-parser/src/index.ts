import { type Token, parse as _parse, tokenize as _tokenize } from './lib/voltair'
import { orderedTokens } from './ordered-tokens'
import { KazSequence } from './sequences'

export const tokenize = (input: string) => {
  return _tokenize(input, orderedTokens)
}

export const parse = (tokens: Token[]) => {
  return _parse(tokens, KazSequence)
}
