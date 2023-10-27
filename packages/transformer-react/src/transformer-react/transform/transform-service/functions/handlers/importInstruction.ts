import { Effect } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleImportInstruction: Handle<'importInstruction', void> = importInstructions =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    if (importInstructions.imports === undefined) {
      yield * _(transformService.addImport(
        'sideEffectImport',
        { path: importInstructions.from.$value },
      ))
      return
    }

    for (const importInstruction of importInstructions.imports) {
      switch (importInstruction.$type) {
        case 'NamedImport': {
          const importType: Uncapitalize<typeof importInstruction.$type> = 'namedImport'

          yield * _(transformService.addImport(
            importType,
            {
              ...yield * _(transformService.handle(importInstruction)),
              path: importInstructions.from.$value,
            },
          ))

          break
        }
        case 'DefaultImport': {
          const importType: Uncapitalize<typeof importInstruction.$type> = 'defaultImport'

          yield * _(transformService.addImport(
            importType,
            {
              ...yield * _(transformService.handle(importInstruction)),
              path: importInstructions.from.$value,
            },
          ))

          break
        }
        case 'NamespaceImport': {
          const importType: Uncapitalize<typeof importInstruction.$type> = 'namespaceImport'

          yield * _(transformService.addImport(
            importType,
            {
              ...yield * _(transformService.handle(importInstruction)),
              path: importInstructions.from.$value,
            },
          ))

          break
        }
      }
    }
  })
