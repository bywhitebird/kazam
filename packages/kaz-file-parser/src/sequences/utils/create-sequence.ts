import type { Sequence } from '../../types/Sequence'

export function createSequence(...sequence: [...Sequence['sequence'], Sequence['modifiers']] | Sequence['sequence']): Sequence {
  const lastArg = sequence[sequence.length - 1]
  const hasModifiers = lastArg
    && ('optional' in lastArg
      || 'min' in lastArg
      || 'max' in lastArg
      || 'union' in lastArg)

  const modifiers = (hasModifiers && lastArg) || {}
  const sequenceWithoutModifiers = (hasModifiers ? sequence.slice(0, -1) : sequence) as Sequence['sequence']

  return { sequence: sequenceWithoutModifiers, modifiers }
}

createSequence.union = (sequences: [Sequence['sequence'][number], ...Sequence['sequence']]) => createSequence(sequences[0], { union: sequences.slice(1) })
