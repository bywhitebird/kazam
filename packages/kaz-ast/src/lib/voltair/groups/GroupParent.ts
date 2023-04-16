import type { Group } from './Group'
import type { Sequence } from '../Sequence'

type GroupParentItem = Sequence | Group

export class GroupParent {
  constructor(
    public readonly $name: string,
    public readonly child: GroupParentItem | (() => GroupParentItem),
  ) {
  }
}

export const gp = (
  name: string,
  child: GroupParent['child'],
): GroupParent => new GroupParent(name, child)
