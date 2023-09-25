import type { ITransformerInput } from '.'

// export interface ITransformerOptions {
// }
export type ITransformerOptions = Record<string, never>

export interface ITransformerOutput {
  [key: string]: ITransformerOutput | (Blob & { name: string })
}

export abstract class TransformerBase {
  constructor(
    public readonly input: ITransformerInput,
    public readonly options: ITransformerOptions,
  ) {
  }

  abstract transform(): ITransformerOutput | void
}
