import type { Sequence } from '../Sequence'
import type { Token } from '../Token'

export class GroupValue {
  constructor(
    public readonly child: Token | Sequence,
  ) {
  }
}

export const gv = (
  child: Token | Sequence,
): GroupValue => new GroupValue(child)
