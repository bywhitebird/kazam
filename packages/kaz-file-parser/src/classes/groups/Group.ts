import type { Sequence } from '../Sequence'
import type { Token } from '../Token'

export class Group {
  public readonly options: { forceMultiple: boolean }

  constructor(
    public readonly $name: string,
    public readonly child: Sequence | Token,
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
  child: Sequence | Token,
  options: Partial<Group['options']> = {},
): Group => new Group(name, child, options)
