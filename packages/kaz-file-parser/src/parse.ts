import type { Token } from './classes/Token'
import { KazSequence } from './sequences/KazSequence'
import { parseSequence } from './sequences/utils/parse-sequence'

export const parse = (tokens: Token[]) => {
  return parseSequence(tokens, KazSequence)
}
