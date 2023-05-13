import { resolveValue } from './resolve-value'
import { Group, GroupParent, GroupValue, Sequence, Token } from '..'

type SequenceItem = Token | Sequence | Group | GroupParent | GroupValue

export const getLastSequenceToken = (
  sequence: Sequence['sequence'][number],
  alreadyVisited: Set<SequenceItem | (() => SequenceItem)> = new Set(),
): (Token | Sequence)[] => {
  const resolvedSequence = resolveValue(sequence)

  if (
    resolvedSequence instanceof Sequence
    && 'tmName' in resolvedSequence
    && alreadyVisited.size > 0
  )
    return [resolvedSequence]

  if (alreadyVisited.has(sequence) || alreadyVisited.has(resolvedSequence))
    return []

  const newAlreadyVisited = alreadyVisited.add(sequence)

  if (resolvedSequence instanceof Sequence) {
    if ('union' in resolvedSequence.modifiers) {
      const union = resolvedSequence.modifiers.union
      return [
        ...union,
        ...resolvedSequence.sequence,
      ]
        .flatMap((sequence) => {
          return getLastSequenceToken(
            sequence,
            newAlreadyVisited,
          )
        })
    }

    const lastToken = resolvedSequence.sequence.at(-1)

    if (lastToken === undefined)
      return []

    return getLastSequenceToken(lastToken, newAlreadyVisited)
  }

  if (resolvedSequence instanceof Group)
    return getLastSequenceToken(resolvedSequence.child, newAlreadyVisited)

  if (resolvedSequence instanceof GroupParent)
    return getLastSequenceToken(resolvedSequence.child, newAlreadyVisited)

  if (resolvedSequence instanceof GroupValue && (resolvedSequence.child instanceof Sequence || resolvedSequence.child instanceof Token))
    return getLastSequenceToken(resolvedSequence.child, newAlreadyVisited)

  if (resolvedSequence instanceof Token)
    return [resolvedSequence]

  return []
}
