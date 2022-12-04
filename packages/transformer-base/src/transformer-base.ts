import type { ITransformerInput } from '.'

// export interface ITransformerOptions {
// }
export type ITransformerOptions = Record<string, never>

export interface ITransformerOutput {
  [key: string]: ITransformerOutput | Blob
}

export abstract class TransformerBase {
  constructor(
    public readonly input: ITransformerInput,
    public readonly options: ITransformerOptions,
  ) {
  }

  abstract transform(): Promise<ITransformerOutput>
}
