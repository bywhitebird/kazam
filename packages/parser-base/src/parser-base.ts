import type { ITransformerInput, TransformerBase } from '@whitebird/kazam-transformer-base'

// this is temporary, will be replaced when the Kazam package is ready
export interface KazamConfig {
  input: string[]
  output: string
  parsers: ParserBase[]
  transformers: TransformerBase[]
}

export abstract class ParserBase {
  abstract load(config: KazamConfig): unknown | Promise<unknown>

  abstract parse(loadResult: Awaited<ReturnType<this['load']>>, config: KazamConfig): ITransformerInput | Promise<ITransformerInput>
}
