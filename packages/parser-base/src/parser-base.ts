import type { ITransformerInput } from '@whitebird/kazam-transformer-base'

import type { KazamConfig } from './types/KazamConfig'

export abstract class ParserBase {
  abstract load(config: KazamConfig): unknown | Promise<unknown>

  abstract parse(loadResult: Awaited<ReturnType<this['load']>>, config: KazamConfig): ITransformerInput | Promise<ITransformerInput>
}
