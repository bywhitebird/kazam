import type { Token } from './Token'

export interface Sequence {
  sequence: Readonly<(Token | Sequence)[]>
  modifiers: (
    | { optional: true }
    | { repeat: number }
    | { min?: number | undefined; max?: number | undefined }
    | { union: Sequence['sequence'] }
  )
}
