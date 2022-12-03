import { z } from 'zod'

export const Expression = z.string()

export type IExpression = z.infer<typeof Expression>
