import { Layer, Ref } from 'effect'

import { ImportStateServiceLive } from './transform-service/states/import-state'
import { MetadataStateServiceLive } from './transform-service/states/metadata-state'
import { TransformServiceLive } from './transform-service/transform-service'

export const createServices = () => Layer.mergeAll(
  TransformServiceLive,
  ImportStateServiceLive(Ref.unsafeMake(
    {
      imports: new Map(),
    },
  )),
  MetadataStateServiceLive(Ref.unsafeMake(
    {
      componentName: '',
      filePath: '',
      input: {},
    },
  )),
)
