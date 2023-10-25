import type { TransformerInput } from '@whitebird/kazam-transformer-base'

interface ParserConfig {
  input: string[]
  output: string
  configPath: string
}

export abstract class ParserBase<LoadResult> {
  abstract load(config: ParserConfig): Promise<LoadResult>
  abstract parse(loadResult: LoadResult, config: ParserConfig): Promise<TransformerInput>

  async loadAndParse(config: ParserConfig) {
    return this.load(config).then(loadResult => this.parse(loadResult, config))
  }
}
