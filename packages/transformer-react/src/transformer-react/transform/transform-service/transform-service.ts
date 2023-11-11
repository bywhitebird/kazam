import { Context, Layer } from 'effect'

import { addImport } from './functions/add-import'
import { autoImport } from './functions/auto-import'
import { getComponentName } from './functions/get-component-name'
import { getImportString } from './functions/get-import-string'
import { getMetadata, setMetadata } from './functions/get-set-metadata'
import { handle } from './functions/handle'

export interface TransformService {
  handle: typeof handle
  getMetadata: typeof getMetadata
  setMetadata: typeof setMetadata
  getComponentName: typeof getComponentName
  addImport: typeof addImport
  getImportString: typeof getImportString
  autoImport: typeof autoImport
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TransformService = Context.Tag<TransformService>()

export const TransformServiceLive = Layer.succeed(
  TransformService,
  TransformService.of({
    handle,
    getMetadata,
    setMetadata,
    getComponentName,
    addImport,
    getImportString,
    autoImport,
  }),
)
