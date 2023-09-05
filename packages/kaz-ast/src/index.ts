import { Effect } from 'effect'

import { parse as _parse } from './parser'

export const parse = (source: string) => Effect.runSync(_parse({
  source,
}))
