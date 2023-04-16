import type { Sequence } from '../Sequence'
import type { Token } from '../Token'
import type { JsonValue } from '../types/JsonValue'

type GroupValueItem = Token | Sequence | JsonValue

export class GroupValue {
  constructor(
    public readonly child: GroupValueItem | (() => GroupValueItem),
  ) {
  }
}

export const gv = (
  child: GroupValue['child'],
): GroupValue => new GroupValue(child)
