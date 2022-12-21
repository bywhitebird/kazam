import { z } from 'zod'

import { Expression } from './expression'

export const Attribute = z.object({
  name: z.string(),
  valueExpression: Expression,
})

export type IAttribute = z.infer<typeof Attribute>
