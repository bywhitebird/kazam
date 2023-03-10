import type { Group } from './groups/Group'
import type { GroupParent } from './groups/GroupParent'
import type { GroupValue } from './groups/GroupValue'
import type { Token } from './Token'

type SequenceItem = Token | Sequence | Group | GroupParent | GroupValue

export class Sequence {
  constructor(
    public sequence: Readonly<(SequenceItem | (() => SequenceItem))[]>,
    public modifiers: (
      | Record<string, never>
      | { optional: true }
      | { repeat: number }
      | { min?: number | undefined; max?: number | undefined }
      | { union: Sequence['sequence'] }
    ) = {},
  ) {}
}

function s(...sequence: [...Sequence['sequence'], Sequence['modifiers']] | Sequence['sequence']): Sequence {
  const lastArg = sequence.at(-1)
  const hasModifiers = lastArg
    && ('optional' in lastArg
      || 'min' in lastArg
      || 'max' in lastArg
      || 'union' in lastArg)

  const modifiers = (hasModifiers && lastArg) || {}
  const sequenceWithoutModifiers = (hasModifiers ? sequence.slice(0, -1) : sequence) as Sequence['sequence']

  return new Sequence(sequenceWithoutModifiers, modifiers)
}

s.union = (sequences: [(SequenceItem | (() => SequenceItem)), ...Readonly<(SequenceItem | (() => SequenceItem))[]>]) => s(sequences[0], { union: sequences.slice(1) })

export { s }
