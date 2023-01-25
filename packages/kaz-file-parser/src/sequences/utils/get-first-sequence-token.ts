import { Sequence } from '../../classes/Sequence'
import type { Token } from '../../classes/Token'

export const getFirstSequenceToken = (sequence: Sequence['sequence'][number]): Token | undefined => {
  if (sequence instanceof Sequence) {
    const firstToken = sequence.sequence[0]

    if (firstToken === undefined)
      return undefined

    return getFirstSequenceToken(firstToken)
  }

  return sequence
}
