import { parse, tokenize } from '@whitebird/kaz-ast'
import type { ITransformerInput } from '@whitebird/kazam-transformer-base'
import deepmerge from 'deepmerge'

const defaultInput: ITransformerInput[string] = {
  $type: 'Kaz',
  instructions: [],
  template: [],
}

export class TransformerInputFactory {
  static async create(input: Partial<ITransformerInput[number]> | string = {}) {
    if (typeof input === 'string') {
      const tokens = tokenize(input)
      const ast = parse(tokens)

      if (ast instanceof Error || ast === undefined)
        throw new Error('Failed to parse input')

      return { Test: deepmerge(defaultInput, ast) }
    }

    return { Test: deepmerge(defaultInput, input) }
  }

  static createMany(...inputs: Partial<ITransformerInput[number]>[]) {
    return inputs.flatMap(input => TransformerInputFactory.create(input))
  }
}
