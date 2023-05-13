import type { Group } from './groups/Group'
import type { GroupParent } from './groups/GroupParent'
import type { GroupValue } from './groups/GroupValue'
import type { Token } from './Token'
import type { TextMateScope } from './types/textmate/TextMateScope'

type SequenceItem = Token | Sequence | Group | GroupParent | GroupValue

type SequenceModifiers = (
  | Record<string, never>
  | { optional: true }
  | { repeat: number }
  | { min?: number | undefined; max?: number | undefined }
  | { union: Sequence['sequence'] }
)

export class Sequence {
  public modifiers: SequenceModifiers
  public tmScope?: TextMateScope | string | undefined
  public tmName?: string | undefined

  constructor(
    public sequence: (SequenceItem | (() => SequenceItem))[],
    options: SequenceModifiers & { tmScope?: Sequence['tmScope'] } & { tmName?: Sequence['tmName'] } = {},
  ) {
    const { tmScope, tmName, ...modifiers } = options
    this.modifiers = modifiers
    this.tmScope = tmScope
    this.tmName = tmName
  }

  public clone(): Sequence {
    return new Sequence(this.sequence, { ...this.modifiers, tmScope: this.tmScope })
  }
}

function s(...sequence: [...Sequence['sequence'], SequenceModifiers & { tmScope?: Sequence['tmScope'] } & { tmName?: Sequence['tmName'] }] | Sequence['sequence']): Sequence {
  const lastArg = sequence.at(-1)
  const hasOptions = lastArg
    && ('optional' in lastArg
      || 'min' in lastArg
      || 'max' in lastArg
      || 'union' in lastArg
      || 'tmScope' in lastArg
      || 'tmName' in lastArg)

  const options = (hasOptions && lastArg) || {}
  const sequenceWithoutOptions = (hasOptions ? sequence.slice(0, -1) : sequence) as Sequence['sequence']

  return new Sequence(sequenceWithoutOptions, options)
}

s.union = (
  sequences: [(SequenceItem | (() => SequenceItem)), ...Readonly<(SequenceItem | (() => SequenceItem))[]>],
  { tmScope, tmName }: { tmScope?: Sequence['tmScope']; tmName?: Sequence['tmName'] } = {},
) => s(sequences[0], { union: sequences.slice(1), tmScope, tmName })

export { s }
