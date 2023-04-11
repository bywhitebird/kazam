import { atom } from 'nanostores'

export const $output = atom<Record<string, string>>({})

export const setOutput = (type: string, output: string) => {
  $output.set({ ...$output.get(), [type]: output })
}
