import type { Token } from '../classes/Token'
import { ImportInstructionSequence } from '../sequences'
import { checkSequence } from '../sequences/utils/check-sequence'
import { getSequences } from '../sequences/utils/get-sequences'
import * as Tokens from '../tokens'

export const importValidator = (tokens: Token[]) => {
  const importSequences = getSequences(tokens, [Tokens.StartInstructionToken, Tokens.ImportInstructionToken], Tokens.EndInstructionToken)

  const errors = importSequences.map(sequence => checkSequence(sequence, ImportInstructionSequence))

  return errors.find(error => error)
}
