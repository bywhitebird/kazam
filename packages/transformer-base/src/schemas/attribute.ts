import { z } from 'zod'

export const Attribute = z.object({
  name: z.string(),
  value: z.string(),
})

export type IAttribute = z.infer<typeof Attribute>
