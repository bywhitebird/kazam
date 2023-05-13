import type { Sequence } from '../Sequence'
import type { Token } from '../Token'

type GroupItem = Sequence | Token

export class Group {
  public readonly options: { forceMultiple: boolean }

  constructor(
    public readonly $name: string,
    public child: GroupItem | (() => GroupItem),
    options: Partial<Group['options']> = {},
  ) {
    this.options = {
      forceMultiple: false,
      ...options,
    }
  }

  public clone(): Group {
    return new Group(this.$name, this.child, this.options)
  }
}

export const g = (
  name: string,
  child: Group['child'],
  options: Partial<Group['options']> = {},
): Group => new Group(name, child, options)
