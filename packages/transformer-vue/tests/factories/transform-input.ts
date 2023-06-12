import type { ITransformerInput } from '@whitebird/kazam-transformer-base'
import deepmerge from 'deepmerge'

const defaultInput: ITransformerInput[string] = {
  $type: 'Kaz',
  instructions: [],
  template: [],
}

export class TransformerInputFactory {
  static create(input: Partial<ITransformerInput[number]> = {}) {
    return { Test: deepmerge(defaultInput, input) }
  }

  static createMany(...inputs: Partial<ITransformerInput[number]>[]) {
    return inputs.flatMap(input => TransformerInputFactory.create(input))
  }
}
