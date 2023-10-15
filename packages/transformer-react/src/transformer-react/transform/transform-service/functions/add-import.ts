import { Effect, Ref } from 'effect'

import { ImportStateService } from '../states/import-state'
import { TransformService } from '../transform-service'

interface DefaultImport {
  type: 'defaultImport'
  name: string
  typeOnly?: boolean | undefined
}

interface NamedImport {
  type: 'namedImport'
  name: string
  alias?: string | undefined
  typeOnly?: boolean | undefined
}

interface NamespaceImport {
  type: 'namespaceImport'
  alias: string
  typeOnly?: boolean | undefined
}

interface SideEffectImport {
  type: 'sideEffectImport'
}

export type Import = (
  | DefaultImport
  | NamedImport
  | NamespaceImport
  | SideEffectImport
) & {
  path: string
}

export const addImport = <
  T extends Import['type'],
  I extends Extract<Import, { type: T }>,
>(
    type: T,
    import_: Omit<I, 'type'>,
  ) =>
    Effect.gen(function* (_) {
      const importState = yield * _(ImportStateService)
      const transformService = yield * _(TransformService)

      const metadata = yield * _(transformService.getMetadata())

      yield * _(Ref.update(
        importState,
        importState => ({
          ...importState,
          imports: importState.imports.set(
            metadata.filePath,
            [
              ...(importState.imports.get(metadata.filePath) ?? []),
              {
                type,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...import_ as any,
              },
            ],
          ),
        }),
      ))
    })
