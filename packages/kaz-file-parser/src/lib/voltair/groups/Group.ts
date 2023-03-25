import type { Sequence } from '../Sequence'
import type { Token } from '../Token'

type GroupItem = Sequence | Token

export class Group {
  public readonly options: { forceMultiple: boolean }

  constructor(
    public readonly $name: string,
    public readonly child: GroupItem | (() => GroupItem),
    options: Partial<Group['options']> = {},
  ) {
    this.options = {
      forceMultiple: false,
      ...options,
    }
  }
}

export const g = (
  name: string,
  child: Group['child'],
  options: Partial<Group['options']> = {},
): Group => new Group(name, child, options)
