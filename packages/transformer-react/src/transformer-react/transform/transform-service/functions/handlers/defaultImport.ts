import { Effect } from 'effect'

import type { Handle } from '../handle'

export const handleDefaultImport = (
  defaultImport =>
    Effect.gen(function* () {
      return {
        name: defaultImport.name.$value,
      }
    })
) satisfies Handle<'defaultImport'>
