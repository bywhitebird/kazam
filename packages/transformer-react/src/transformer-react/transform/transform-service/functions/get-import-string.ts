import { Effect, Ref } from 'effect'

import { ImportStateService } from '../states/import-state'
import { TransformService } from '../transform-service'

export const getImportString = () =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    const importStateService = yield * _(ImportStateService)
    const importState = yield * _(Ref.get(importStateService))

    const metadata = yield * _(transformService.getMetadata())

    const imports = importState.imports.get(metadata.filePath)

    if (imports === undefined)
      return ''

    return imports.map((import_) => {
      if (import_.type === 'sideEffectImport')
        return `import '${import_.path}'`

      return String.prototype.concat(
        'import ',
        import_.typeOnly === true ? 'type ' : '',
        import_.type === 'defaultImport'
          ? import_.name
          : import_.type === 'namedImport'
            ? `{ ${import_.name}${import_.alias !== undefined ? ` as ${import_.alias}` : ''} }`
            : import_.type === 'namespaceImport'
              ? `* as ${import_.alias}`
              : '',
        ' from ',
        `'${import_.path}'`,
      )
    }).join('\n')
  })