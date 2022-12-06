import type { ITransformerInput } from '@whitebird/kazam-transformer-base'

const defaultInput: ITransformerInput[number] = {
  name: 'Test',
  template: [{ tag: 'div' }],
}

export class TransformerInputFactory {
  static create(input: Partial<ITransformerInput[number]> = {}) {
    return [{
      ...defaultInput,
      ...input,
    }]
  }

  static createMany(...inputs: Partial<ITransformerInput[number]>[]) {
    return inputs.flatMap(input => TransformerInputFactory.create(input))
  }
}
