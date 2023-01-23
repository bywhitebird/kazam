import type { Sequence } from '../../types/Sequence'
import type { Token } from '../../types/Token'

export const getFirstSequenceToken = (sequence: Sequence['sequence'][number]): Token | undefined => {
  if ('sequence' in sequence) {
    const firstToken = sequence.sequence[0]

    if (firstToken === undefined)
      return undefined

    return getFirstSequenceToken(firstToken)
  }

  return sequence
}
