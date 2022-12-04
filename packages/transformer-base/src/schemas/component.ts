import { z } from 'zod'

import { Content } from './content'
import { Props } from './props'
import { Statement } from './statement'

export const Component = z.object({
  name: z.string(),
  props: Props.array().optional(),
  hasChildren: z.boolean().optional(),
  statements: Statement.array().optional(),
  template: Content,
})

export type IComponent = z.infer<typeof Component>
