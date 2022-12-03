import { z } from 'zod'

import { Expression } from './expression'

export const Computed = z.object({
  name: z.string(),
  getterExpression: Expression,
})

export type IComputed = z.infer<typeof Computed>
