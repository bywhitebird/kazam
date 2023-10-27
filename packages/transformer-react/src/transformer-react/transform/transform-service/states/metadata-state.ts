import type { Ref } from 'effect'
import { Context, Layer } from 'effect'

import type { TransformerReact } from '../../../transformer-react'

// eslint-disable-next-line import/namespace
export interface MetadataState extends Ref.Ref<{
  componentName: string
  filePath: string
  sourceAbsoluteFilePath: string
  outputAbsoluteFilePath: string
  input: TransformerReact['input']
}> { }

export const MetadataStateService = Context.Tag<MetadataState>()

export const MetadataStateServiceLive = Layer.succeed(MetadataStateService)
