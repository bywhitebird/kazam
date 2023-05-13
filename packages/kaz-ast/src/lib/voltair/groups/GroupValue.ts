import type { Sequence } from '../Sequence'
import type { Token } from '../Token'
import type { JsonValue } from '../types/JsonValue'

type GroupValueItem = Token | Sequence | JsonValue

export class GroupValue {
  constructor(
    public child: GroupValueItem | (() => GroupValueItem),
  ) {
  }

  public clone(): GroupValue {
    return new GroupValue(this.child)
  }
}

export const gv = (
  child: GroupValue['child'],
): GroupValue => new GroupValue(child)
