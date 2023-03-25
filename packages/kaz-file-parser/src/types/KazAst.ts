/* eslint-disable @typescript-eslint/no-use-before-define */
import zod from 'zod'

const kazTemplateTagAttributeSchema = zod.object({
  $type: zod.literal('TagAttribute'),
  name: zod.string(),
  value: zod.union([zod.string(), zod.boolean()]).optional(),
  expression: zod.string().optional(),
})

export interface KazTemplateTag {
  $type: 'Tag'
  tagName: string
  attributes: zod.infer<typeof kazTemplateTagAttributeSchema>[]
  children: zod.infer<typeof kazTemplateSchema>[]
}

const kazTemplateTagSchema: zod.ZodType<KazTemplateTag> = zod.object({
  $type: zod.literal('Tag'),
  tagName: zod.string(),
  attributes: zod.array(kazTemplateTagAttributeSchema),
  children: zod.lazy(() => zod.array(kazTemplateSchema)),
})

const kazTemplateTextSchema = zod.object({
  $type: zod.literal('Text'),
  text: zod.string(),
})

const kazTemplateExpressionSchema = zod.object({
  $type: zod.literal('Expression'),
  expression: zod.string(),
})

export interface KazTemplateFor {
  $type: 'ForLogical'
  parameters: string
  children: zod.infer<typeof kazTemplateSchema>[]
}

const kazTemplateForSchema: zod.ZodType<KazTemplateFor> = zod.object({
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

const kazTemplateElseIfSchema: zod.ZodType<KazTemplateElseIf> = zod.object({
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

const kazTemplateElseSchema: zod.ZodType<KazTemplateElse> = zod.object({
  $type: zod.literal('ElseLogical'),
  children: zod.lazy(() => zod.array(kazTemplateSchema)),
})

export interface KazTemplateIf {
  $type: 'IfLogical'
  condition: string
  children: zod.infer<typeof kazTemplateSchema>[]
  else?: KazTemplateElse | KazTemplateElseIf | undefined
}

const kazTemplateIfSchema: zod.ZodType<KazTemplateIf> = zod.object({
  $type: zod.literal('IfLogical'),
  condition: zod.string(),
  children: zod.lazy(() => zod.array(kazTemplateSchema)),
  else: zod.union([kazTemplateElseSchema, kazTemplateElseIfSchema]).optional(),
})

const kazTemplateSchema = zod.union([
  kazTemplateTagSchema,
  kazTemplateTextSchema,
  kazTemplateExpressionSchema,
  kazTemplateForSchema,
  kazTemplateIfSchema,
])

const kazNamedImportSchema = zod.object({
  $type: zod.literal('NamedImport'),
  name: zod.string(),
  alias: zod.string().optional(),
})

const kazDefaultImportSchema = zod.object({
  $type: zod.literal('DefaultImport'),
  name: zod.string(),
})

const kazNamespaceImportSchema = zod.object({
  $type: zod.literal('NamespaceImport'),
  name: zod.string(),
})

const kazImportInstructionSchema = zod.object({
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

const kazWatchedVariableSchema = zod.object({
  name: zod.string(),
  type: zod.string().optional(),
})

const kazWatchInstructionSchema = zod.object({
  $type: zod.literal('WatchInstruction'),
  watchedVariables: zod.array(kazWatchedVariableSchema),
  callbackExpression: zod.string(),
})

const kazComputedInstructionSchema = zod.object({
  $type: zod.literal('ComputedInstruction'),
  name: zod.string(),
  type: zod.string().optional(),
  computeValue: zod.object({
    expression: zod.string(),
  }),
})

const kazEventParameterSchema = zod.object({
  name: zod.string(),
  type: zod.string().optional(),
})

const kazEventInstructionSchema = zod.object({
  $type: zod.literal('EventInstruction'),
  eventName: zod.string(),
  parameters: zod.array(kazEventParameterSchema),
  callbackExpression: zod.string(),
})

const kazPropInstructionSchema = zod.object({
  $type: zod.literal('PropInstruction'),
  name: zod.string(),
  type: zod.string().optional(),
  defaultValue: zod.object({
    expression: zod.string(),
  }).optional(),
})

const kazStateInstructionSchema = zod.object({
  $type: zod.literal('StateInstruction'),
  name: zod.string(),
  type: zod.string().optional(),
  defaultValue: zod.object({
    expression: zod.string(),
  }).optional(),
})

const kazAstSchema = zod.object({
  $type: zod.literal('Kaz'),
  instructions: zod.array(
    zod.union([
      kazImportInstructionSchema,
      kazWatchInstructionSchema,
      kazComputedInstructionSchema,
      kazEventInstructionSchema,
      kazPropInstructionSchema,
      kazStateInstructionSchema,
    ]),
  ),
  template: zod.array(
    zod.union([
      kazTemplateTagSchema,
      kazTemplateTextSchema,
      kazTemplateExpressionSchema,
      kazTemplateForSchema,
      kazTemplateIfSchema,
    ]),
  ),
})

export { kazAstSchema }
export type KazAst = zod.infer<typeof kazAstSchema>
