import { map } from 'nanostores'

export const $tabs = map<Record<string, string>>({})

export const setTab = (group: string, value: string) => {
  $tabs.setKey(group, value)
}
