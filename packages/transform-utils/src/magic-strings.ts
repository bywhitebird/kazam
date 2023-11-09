import { Buffer } from 'node:buffer'

class MagicString<Parameters extends string[] = []> {
  constructor(private readonly magicString: string) { }

  create(...strings: Parameters) {
    const encodedString = strings.map(string => Buffer.from(string).toString('base64')).join('&')

    return `${this.magicString}__${encodedString}`
  }

  parse(magicString: string): Parameters {
    const [guid, encodedString] = magicString.split('__')

    if (guid !== this.magicString)
      throw new Error(`The magic string ${magicString} is not a ${this.magicString} magic string.`)

    const encodedStrings = encodedString?.split('&') ?? []

    return encodedStrings.map(encodedString => Buffer.from(encodedString, 'base64').toString('utf-8')) as unknown as Parameters
  }

  get regexp() {
    const base64RegExp = '(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?'
    return new RegExp(`${this.magicString}__(?:${base64RegExp}&?)*`, 'g')
  }
}

export const magicStrings = {
  setState: new MagicString<[stateName: string, setter: string]>('cb7c9a40-0971-4ecd-87c5-0572727d1a5b'),
  getState: new MagicString<[stateName: string]>('153c1b2d-d22f-439a-976c-20af6d7659b3'),
  getComputed: new MagicString<[computedName: string]>('28ddb00a-552b-4c53-98a4-54a8eebdaf43'),
  kazStateJSDoc: new MagicString('5c46e186-3ca8-45f5-9971-4012b174b715'),
  kazComputedJSDoc: new MagicString('d1216e22-94df-4b98-828a-87c53bc24b8a'),
}
