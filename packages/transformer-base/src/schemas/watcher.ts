import { z } from 'zod'

import { Expression } from './expression'

export const Watcher = z.object({
  stateName: z.string(),
  callbackExpression: Expression,
})

export type IWatcher = z.infer<typeof Watcher>
