import type { Ref } from 'effect'
import { Context, Layer } from 'effect'

import type { TransformerAlakazam } from '../../../transformer-alakazam'

export interface MetadataState extends Ref.Ref<{
  componentName: string
  filePath: string
  sourceAbsoluteFilePath: string
  outputAbsoluteFilePath: string
  input: TransformerAlakazam['input']
}> { }

export const MetadataStateService = Context.Tag<MetadataState>()

export const MetadataStateServiceLive = Layer.succeed(MetadataStateService)
