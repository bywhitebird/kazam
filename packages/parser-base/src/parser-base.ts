import type { ITransformerInput, TransformerBase } from '@whitebird/kazam-transformer-base'

type Transformer = new (...args: ConstructorParameters<typeof TransformerBase>) => TransformerBase
type Parser = new (...args: ConstructorParameters<typeof ParserBase>) => ParserBase

interface KazamConfig {
  input: string[]
  output: string
  transformers: [Transformer, ...Transformer[]]
  parsers: [Parser, ...Parser[]]
}

export abstract class ParserBase {
  abstract load(config: KazamConfig): unknown | Promise<unknown>

  abstract parse(loadResult: Awaited<ReturnType<this['load']>>, config: KazamConfig): ITransformerInput | Promise<ITransformerInput>
}
