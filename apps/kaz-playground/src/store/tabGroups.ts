import { map } from 'nanostores'

if (typeof window !== 'undefined')
  throw new Error('This file should be imported only on server')

export const $tabGroups = map<Record<string, Set<string>>>({})

export const addTab = (group: string, value: string) => {
  const current = $tabGroups.get()
  $tabGroups.setKey(group, current[group]?.add(value) ?? new Set([value]))
}
