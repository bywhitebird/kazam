import type { Group } from './Group'
import type { Sequence } from '../Sequence'

type GroupParentItem = Sequence | Group

export class GroupParent {
  constructor(
    public readonly $name: string,
    public child: GroupParentItem | (() => GroupParentItem),
  ) {
  }

  public clone(): GroupParent {
    return new GroupParent(this.$name, this.child)
  }
}

export const gp = (
  name: string,
  child: GroupParent['child'],
): GroupParent => new GroupParent(name, child)
