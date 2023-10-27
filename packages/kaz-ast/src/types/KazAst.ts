/* eslint-disable @typescript-eslint/no-use-before-define */
import zod from 'zod'

const valueSchema = <T extends zod.ZodType>(value: T) => zod.object({
  $value: value,
  $range: zod.tuple([zod.number(), zod.number()]),
})

interface Value<T> {
  $value: T
  $range: [number, number]
}

export const kazTemplateTagAttributeSchema = zod.object({
  $type: zod.literal('TagAttribute'),
  name: valueSchema(zod.string()),
}).and(zod.union([
  zod.object({
    value: zod.union([
      valueSchema(zod.string()),
      zod.boolean(),
    ]),
  }),
  zod.object({ expression: valueSchema(zod.string()) }),
]))

export const kazTemplateTagEventAttributeSchema = zod.object({
  $type: zod.literal('TagEventAttribute'),
  name: valueSchema(zod.string()),
  expression: valueSchema(zod.string()),
})

export interface KazTemplateTag {
  $type: 'Tag'
  tagName: Value<string>
  attributes: (zod.infer<typeof kazTemplateTagAttributeSchema> | zod.infer<typeof kazTemplateTagEventAttributeSchema>)[]
  children?: zod.infer<typeof kazTemplateSchema>[] | undefined
}

export const kazTemplateTagSchema: zod.ZodType<KazTemplateTag> = zod.object({
  $type: zod.literal('Tag'),
  tagName: valueSchema(zod.string()),
  attributes: zod.array(zod.union([kazTemplateTagAttributeSchema, kazTemplateTagEventAttributeSchema])),
  children: zod.lazy(() => zod.array(kazTemplateSchema)).optional(),
})

export const kazTemplateTextSchema = zod.object({
  $type: zod.literal('Text'),
  text: valueSchema(zod.string()),
})

export const kazTemplateExpressionSchema = zod.object({
  $type: zod.literal('Expression'),
  expression: valueSchema(zod.string()),
})

export interface KazTemplateFor {
  $type: 'ForLogical'
  parameters: Value<string>
  children: zod.infer<typeof kazTemplateSchema>[]
}

export const kazTemplateForSchema: zod.ZodType<KazTemplateFor> = zod.object({
  $type: zod.literal('ForLogical'),
  parameters: valueSchema(zod.string()),
  children: zod.lazy(() => zod.array(kazTemplateSchema)),
})

export interface KazTemplateElseIf {
  $type: 'ElseLogical'
  if: {
    $type: 'ElseIfLogical'
    condition: Value<string>
    children: zod.infer<typeof kazTemplateSchema>[]
    else?: KazTemplateElse | KazTemplateElseIf | undefined
  }
}

export const kazTemplateElseIfSchema: zod.ZodType<KazTemplateElseIf> = zod.object({
  $type: zod.literal('ElseLogical'),
  if: zod.object({
    $type: zod.literal('ElseIfLogical'),
    condition: valueSchema(zod.string()),
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
  condition: Value<string>
  children: zod.infer<typeof kazTemplateSchema>[]
  else?: KazTemplateElse | KazTemplateElseIf | undefined
}

export const kazTemplateIfSchema: zod.ZodType<KazTemplateIf> = zod.object({
  $type: zod.literal('IfLogical'),
  condition: valueSchema(zod.string()),
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
  name: valueSchema(zod.string()),
  alias: valueSchema(zod.string()).optional(),
})

export const kazDefaultImportSchema = zod.object({
  $type: zod.literal('DefaultImport'),
  name: valueSchema(zod.string()),
})

export const kazNamespaceImportSchema = zod.object({
  $type: zod.literal('NamespaceImport'),
  name: valueSchema(zod.string()),
})

export const kazImportInstructionSchema = zod.object({
  $type: zod.literal('ImportInstruction'),
  from: valueSchema(zod.string()),
  imports: zod.array(
    zod.union([
      kazNamedImportSchema,
      kazDefaultImportSchema,
      kazNamespaceImportSchema,
    ]),
  ).optional(),
})

export const kazLifecycleEventInstructionSchema = zod.object({
  $type: zod.literal('LifecycleEventInstruction'),
  event: valueSchema(zod.literal('mount')),
  callbackExpression: valueSchema(zod.string()),
})

export const kazWatchedVariableSchema = zod.object({
  name: valueSchema(zod.string()),
  type: valueSchema(zod.string()).optional(),
})

export const kazWatchInstructionSchema = zod.object({
  $type: zod.literal('WatchInstruction'),
  watchedVariables: zod.array(kazWatchedVariableSchema),
  callbackExpression: valueSchema(zod.string()),
})

export const kazComputedInstructionSchema = zod.object({
  $type: zod.literal('ComputedInstruction'),
  name: valueSchema(zod.string()),
  type: valueSchema(zod.string()).optional(),
  computeValue: zod.object({
    expression: valueSchema(zod.string()),
  }),
})

export const kazPropInstructionSchema = zod.object({
  $type: zod.literal('PropInstruction'),
  name: valueSchema(zod.string()),
  type: valueSchema(zod.string()).optional(),
  defaultValue: zod.object({
    expression: valueSchema(zod.string()),
  }).optional(),
})

export const kazStateInstructionSchema = zod.object({
  $type: zod.literal('StateInstruction'),
  name: valueSchema(zod.string()),
  type: valueSchema(zod.string()).optional(),
  defaultValue: zod.object({
    expression: valueSchema(zod.string()),
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
      kazLifecycleEventInstructionSchema,
    ]),
  ),
  template: zod.array(kazTemplateSchema),
})

export type KazAst = zod.infer<typeof kazAstSchema>
