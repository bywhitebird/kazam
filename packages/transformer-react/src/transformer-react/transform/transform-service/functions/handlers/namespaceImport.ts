import { Effect } from 'effect'

import type { Handle } from '../handle'

export const handleNamespaceImport = (
  namespaceImport => Effect.gen(function* () {
    return {
      alias: namespaceImport.name.$value,
    }
  })
) satisfies Handle<'namespaceImport'>
