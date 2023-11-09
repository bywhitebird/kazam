import type { z } from 'zod'

import type * as schemas from '../types/KazAst'

type AllSchemas = typeof schemas[keyof typeof schemas]
type AllInferedSchemas = z.infer<Extract<AllSchemas, z.ZodObject<{ $type: z.ZodLiteral<string> }>>>
type Visitor = {
  [T in AllInferedSchemas['$type']]?: (node: Extract<AllInferedSchemas, { $type: T }>) => void
} & {
  enter?: (node: AllInferedSchemas) => void
}

export const traverse = (ast: AllInferedSchemas, visitor: Visitor) => {
  const traverse = (node: AllInferedSchemas) => {
    (visitor[node.$type] ?? visitor.enter)?.(node as never)

    for (const key in node) {
      const value = node[key as keyof typeof node] as unknown

      if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === 'object' && item !== null)
            traverse(item)
        }
      }
      else if (typeof value === 'object' && value !== null && '$type' in value) {
        traverse(value as AllInferedSchemas)
      }
    }
  }

  traverse(ast)
}
