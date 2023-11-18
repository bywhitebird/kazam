import type { TransformerInput } from '@whitebird/kazam-transformer-base'

interface ParserConfig {
  input: string[]
  output: string
  rootDir: string
}

interface BaseMetadata {
  extension: `.${string}`
}

export abstract class ParserBase<LoadResult, Metadata extends BaseMetadata> {
  abstract metadata: Metadata

  abstract load(config: ParserConfig): Promise<LoadResult>
  abstract parse(loadResult: LoadResult, config: ParserConfig): Promise<Record<string, Omit<TransformerInput[string], 'getTransformedOutputFilePath'>>>

  async loadAndParse(config: ParserConfig): ReturnType<ParserBase<LoadResult, Metadata>['parse']> {
    return this.load(config).then(loadResult => this.parse(loadResult, config))
  }
}
