import type { Ref } from 'effect'
import { Context, Layer } from 'effect'

import type { Import } from '../functions/add-import'

export interface ImportState extends Ref.Ref<{
  imports: Map<string, Import[]>
}> { }

export const ImportStateService = Context.Tag<ImportState>()

export const ImportStateServiceLive = Layer.succeed(ImportStateService)
