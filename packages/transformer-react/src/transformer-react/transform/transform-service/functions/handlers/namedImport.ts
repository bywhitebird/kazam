import { Effect } from 'effect'

import type { Handle } from '../handle'

export const handleNamedImport = (
  namedImport => Effect.gen(function* () {
    return {
      name: namedImport.name.$value,
      alias: namedImport.alias?.$value,
    }
  })
) satisfies Handle<'namedImport'>
