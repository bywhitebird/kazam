import type { Sequence } from '../Sequence'
import type { Token } from '../Token'

type GroupValueItem = Token | Sequence

export class GroupValue {
  constructor(
    public readonly child: GroupValueItem | (() => GroupValueItem),
  ) {
  }
}

export const gv = (
  child: GroupValue['child'],
): GroupValue => new GroupValue(child)
