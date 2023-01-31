import { Group } from '../../classes/groups/Group'
import { GroupParent } from '../../classes/groups/GroupParent'
import { GroupValue } from '../../classes/groups/GroupValue'
import { Sequence } from '../../classes/Sequence'
import type { Token } from '../../classes/Token'

export const getFirstSequenceToken = (sequence: Sequence['sequence'][number]): Token | undefined => {
  if (sequence instanceof Sequence) {
    const firstToken = sequence.sequence[0]

    if (firstToken === undefined)
      return undefined

    return getFirstSequenceToken(firstToken)
  }

  if (sequence instanceof Group)
    return getFirstSequenceToken(sequence.child)

  if (sequence instanceof GroupParent)
    return getFirstSequenceToken(sequence.child)

  if (sequence instanceof GroupValue)
    return getFirstSequenceToken(sequence.child)

  return sequence
}
