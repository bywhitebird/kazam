import * as path from 'node:path'

import { Effect, Ref } from 'effect'

import type { Import } from './add-import'
import { ImportStateService } from '../states/import-state'
import { TransformService } from '../transform-service'

const removeDuplicatedImports = (imports: Import[]) => {
  return imports.filter((import_, index) => {
    const firstIndex = imports.findIndex((import__) => {
      if (import_.path !== import__.path)
        return false

      if (import_.type === 'defaultImport' && import__.type === 'defaultImport')
        return import_.name === import__.name && import_.typeOnly === import__.typeOnly

      if (import_.type === 'namedImport' && import__.type === 'namedImport')
        return import_.name === import__.name && import_.alias === import__.alias && import_.typeOnly === import__.typeOnly

      if (import_.type === 'namespaceImport' && import__.type === 'namespaceImport')
        return import_.alias === import__.alias && import_.typeOnly === import__.typeOnly

      if (import_.type === 'sideEffectImport' && import__.type === 'sideEffectImport')
        return true

      return false
    })

    return firstIndex === index
  })
}

export const getImportString = () =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    const importStateService = yield * _(ImportStateService)
    const importState = yield * _(Ref.get(importStateService))

    const metadata = yield * _(transformService.getMetadata())

    const imports = importState.imports.get(metadata.filePath)

    if (imports === undefined)
      return ''

    return removeDuplicatedImports(imports).map((import_) => {
      // The following block will fix the import path if it is a relative path
      if (import_.path.startsWith('.')) {
        const absoluteImportedFilePath = path.resolve(
          path.dirname(metadata.sourceAbsoluteFilePath),
          import_.path,
        )

        const relativeImportedFilePath = path.relative(
          path.dirname(metadata.outputAbsoluteFilePath),
          absoluteImportedFilePath,
        )

        import_.path = `./${relativeImportedFilePath}`
      }

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
