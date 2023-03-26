import { atom } from 'nanostores'

export const $output = atom<string>('')

export const setOutput = (output: string) => {
  $output.set(output)
}
