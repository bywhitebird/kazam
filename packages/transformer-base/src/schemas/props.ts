import { z } from 'zod'

import { Expression } from './expression'

export const Props = z.record(
  z.string(),
  z.object({
    type: z.string().optional(),
    defaultValueExpression: Expression.optional(),
  }),
)

export type IProps = z.infer<typeof Props>
