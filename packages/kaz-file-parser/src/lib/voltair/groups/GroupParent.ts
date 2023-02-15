import type { Sequence } from '../Sequence'
import type { Group } from './Group'

export class GroupParent {
  constructor(
    public readonly $name: string,
    public readonly child: Sequence | Group,
  ) {
  }
}

export const gp = (
  name: string,
  child: Sequence | Group,
): GroupParent => new GroupParent(name, child)
