import type * as fs from 'node:fs'

import type { TransformerInput } from '@whitebird/kazam-transformer-base'

interface ParserOptions {
  input: string[]
  output: string
  rootDir: string
  fs: { promises: Pick<typeof fs.promises, 'readFile' | 'readdir'> }
}

interface BaseMetadata {
  extension: `.${string}`
}

export abstract class ParserBase<LoadResult, Metadata extends BaseMetadata> {
  abstract metadata: Metadata

  abstract load(options: ParserOptions): Promise<LoadResult>
  abstract parse(loadResult: LoadResult, options: ParserOptions): Promise<Record<string, Omit<TransformerInput[string], 'getTransformedOutputFilePath'>>>

  async loadAndParse(options: ParserOptions): ReturnType<ParserBase<LoadResult, Metadata>['parse']> {
    return this.load(options).then(loadResult => this.parse(loadResult, options))
  }
}
