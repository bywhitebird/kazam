import { atom } from 'nanostores'

const defaultCode = `
- import _ from "lodash"
- prop buttonText: string = "Button"
- prop callback: () => void = () => console.log('Button clicked')

div() {
    button(
        type="submit",
        on:click={callback}
    ) {
        \${buttonText}
    }
}
`.trimStart()

export const $code = atom<string>(defaultCode)

export const setCode = (code: string) => {
  $code.set(code)
}
