import { z } from 'zod'

import { Expression } from './expression'

export const Event = z.object({
  name: z.string(),
  callbackExpression: Expression,
})

export type IEvent = z.infer<typeof Event>
