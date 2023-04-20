/* eslint-disable @typescript-eslint/no-use-before-define */
import zod from 'zod'

export const kazTemplateTagAttributeSchema = zod.object({
  $type: zod.literal('TagAttribute'),
  name: zod.string(),
}).and(zod.union([
  zod.object({ value: zod.union([zod.string(), zod.boolean()]) }),
  zod.object({ expression: zod.string() }),
]))

export const kazTemplateTagEventAttributeSchema = zod.object({
  $type: zod.literal('TagEventAttribute'),
  name: zod.string(),
  expression: zod.string(),
})

export interface KazTemplateTag {
  $type: 'Tag'
  tagName: string
  attributes: (zod.infer<typeof kazTemplateTagAttributeSchema> | zod.infer<typeof kazTemplateTagEventAttributeSchema>)[]
  children?: zod.infer<typeof kazTemplateSchema>[] | undefined
}

export const kazTemplateTagSchema: zod.ZodType<KazTemplateTag> = zod.object({
  $type: zod.literal('Tag'),
  tagName: zod.string(),
  attributes: zod.array(zod.union([kazTemplateTagAttributeSchema, kazTemplateTagEventAttributeSchema])),
  children: zod.lazy(() => zod.array(kazTemplateSchema)).optional(),
})

export const kazTemplateTextSchema = zod.object({
  $type: zod.literal('Text'),
  text: zod.string(),
})

export const kazTemplateExpressionSchema = zod.object({
  $type: zod.literal('Expression'),
  expression: zod.string(),
})

export interface KazTemplateFor {
  $type: 'ForLogical'
  parameters: string
  children: zod.infer<typeof kazTemplateSchema>[]
}

export const kazTemplateForSchema: zod.ZodType<KazTemplateFor> = zod.object({
  $type: zod.literal('ForLogical'),
  parameters: zod.string(),
  children: zod.lazy(() => zod.array(kazTemplateSchema)),
})

export interface KazTemplateElseIf {
  $type: 'ElseLogical'
  if: {
    $type: 'ElseIfLogical'
    condition: string
    children: zod.infer<typeof kazTemplateSchema>[]
    else?: KazTemplateElse | KazTemplateElseIf | undefined
  }
}

export const kazTemplateElseIfSchema: zod.ZodType<KazTemplateElseIf> = zod.object({
  $type: zod.literal('ElseLogical'),
  if: zod.object({
    $type: zod.literal('ElseIfLogical'),
    condition: zod.string(),
    children: zod.lazy(() => zod.array(kazTemplateSchema)),
    else: zod.union([
      zod.lazy(() => kazTemplateElseSchema),
      zod.lazy(() => kazTemplateElseIfSchema),
    ]).optional(),
  }),
})

export interface KazTemplateElse {
  $type: 'ElseLogical'
  children: zod.infer<typeof kazTemplateSchema>[]
}

export const kazTemplateElseSchema: zod.ZodType<KazTemplateElse> = zod.object({
  $type: zod.literal('ElseLogical'),
  children: zod.lazy(() => zod.array(kazTemplateSchema)),
})

export interface KazTemplateIf {
  $type: 'IfLogical'
  condition: string
  children: zod.infer<typeof kazTemplateSchema>[]
  else?: KazTemplateElse | KazTemplateElseIf | undefined
}

export const kazTemplateIfSchema: zod.ZodType<KazTemplateIf> = zod.object({
  $type: zod.literal('IfLogical'),
  condition: zod.string(),
  children: zod.lazy(() => zod.array(kazTemplateSchema)),
  else: zod.union([kazTemplateElseSchema, kazTemplateElseIfSchema]).optional(),
})

export const kazTemplateSchema = zod.union([
  kazTemplateTagSchema,
  kazTemplateTextSchema,
  kazTemplateExpressionSchema,
  kazTemplateForSchema,
  kazTemplateIfSchema,
])

export const kazNamedImportSchema = zod.object({
  $type: zod.literal('NamedImport'),
  name: zod.string(),
  alias: zod.string().optional(),
})

export const kazDefaultImportSchema = zod.object({
  $type: zod.literal('DefaultImport'),
  name: zod.string(),
})

export const kazNamespaceImportSchema = zod.object({
  $type: zod.literal('NamespaceImport'),
  name: zod.string(),
})

export const kazImportInstructionSchema = zod.object({
  $type: zod.literal('ImportInstruction'),
  from: zod.string(),
  imports: zod.array(
    zod.union([
      kazNamedImportSchema,
      kazDefaultImportSchema,
      kazNamespaceImportSchema,
    ]),
  ).optional(),
})

export const kazWatchedVariableSchema = zod.object({
  name: zod.string(),
  type: zod.string().optional(),
})

export const kazWatchInstructionSchema = zod.object({
  $type: zod.literal('WatchInstruction'),
  watchedVariables: zod.array(kazWatchedVariableSchema),
  callbackExpression: zod.string(),
})

export const kazComputedInstructionSchema = zod.object({
  $type: zod.literal('ComputedInstruction'),
  name: zod.string(),
  type: zod.string().optional(),
  computeValue: zod.object({
    expression: zod.string(),
  }),
})

export const kazPropInstructionSchema = zod.object({
  $type: zod.literal('PropInstruction'),
  name: zod.string(),
  type: zod.string().optional(),
  defaultValue: zod.object({
    expression: zod.string(),
  }).optional(),
})

export const kazStateInstructionSchema = zod.object({
  $type: zod.literal('StateInstruction'),
  name: zod.string(),
  type: zod.string().optional(),
  defaultValue: zod.object({
    expression: zod.string(),
  }).optional(),
})

export const kazAstSchema = zod.object({
  $type: zod.literal('Kaz'),
  instructions: zod.array(
    zod.union([
      kazImportInstructionSchema,
      kazWatchInstructionSchema,
      kazComputedInstructionSchema,
      kazPropInstructionSchema,
      kazStateInstructionSchema,
    ]),
  ),
  template: zod.array(kazTemplateSchema),
})

export type KazAst = zod.infer<typeof kazAstSchema>
