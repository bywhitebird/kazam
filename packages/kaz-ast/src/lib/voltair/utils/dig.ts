import { resolveValue } from './resolve-value'
import { Group, GroupParent, GroupValue, Sequence, Token } from '..'

export type ExplorableEntity = Sequence | Token | undefined

function digGroupParent(groupParent: GroupParent): ExplorableEntity {
  const child = resolveValue(groupParent.child)

  if (child instanceof Sequence)
    return child

  return digGroup(child)
}

function digGroup(group: Group): ExplorableEntity {
  return resolveValue(group.child)
}

function digGroupValue(groupValue: GroupValue): ExplorableEntity {
  const child = resolveValue(groupValue.child)

  if (!(child instanceof Sequence) && !(child instanceof Token))
    return undefined

  return child
}

export function dig(entity: GroupParent | Group | GroupValue) {
  if (entity instanceof Group)
    return digGroup(entity)

  if (entity instanceof GroupParent)
    return digGroupParent(entity)

  if (entity instanceof GroupValue)
    return digGroupValue(entity)

  return undefined
}
