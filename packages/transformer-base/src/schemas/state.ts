import { z } from 'zod'

import { Expression } from './expression'

export const State = z.object({
  name: z.string(),
  type: z.string().optional(),
  initialValueExpression: Expression,
})

export type IState = z.infer<typeof State>
