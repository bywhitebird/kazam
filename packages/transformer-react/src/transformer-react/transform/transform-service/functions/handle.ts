import * as schemas from '@whitebird/kaz-ast'
import type { Effect } from 'effect'
import { upperFirst } from 'lodash'
import type { z } from 'zod'

import * as importedHandlers from './handlers'
import type { ImportState } from '../states/import-state'
import type { MetadataState } from '../states/metadata-state'
import type { TransformService } from '../transform-service'

type GetSchemaName<T extends string> = T extends `kaz${infer U}Schema` ? Uncapitalize<U> : never

type AllSchemaNames = GetSchemaName<keyof typeof schemas>

type GetZodSchema<SchemaName extends AllSchemaNames> = typeof schemas[`kaz${Capitalize<SchemaName>}Schema`]

type GetSchema<SchemaName extends AllSchemaNames> = z.infer<GetZodSchema<SchemaName>>

export type Handle<SchemaName extends AllSchemaNames, Return = unknown> = (
  data: GetSchema<SchemaName>,
) => Effect.Effect<TransformService | MetadataState | ImportState, never, Return>

type Handlers = {
  [
  SchemaName in AllSchemaNames as GetSchema<SchemaName> extends { $type: string }
    ? GetZodSchema<SchemaName> extends z.ZodUnion<z.ZodUnionOptions>
      ? never
      : SchemaName
    : never
  ]: Handle<SchemaName>
}

const handlers = {
  ast: importedHandlers.handleKaz,
  computedInstruction: importedHandlers.handleComputedInstruction,
  importInstruction: importedHandlers.handleImportInstruction,
  defaultImport: importedHandlers.handleDefaultImport,
  namedImport: importedHandlers.handleNamedImport,
  namespaceImport: importedHandlers.handleNamespaceImport,
  propInstruction: importedHandlers.handlePropInstruction,
  stateInstruction: importedHandlers.handleStateInstruction,
  watchInstruction: importedHandlers.handleWatchInstruction,
  templateTagAttribute: importedHandlers.handleTemplateTagAttribute,
  templateTagEventAttribute: importedHandlers.handleTemplateTagEventAttribute,
  templateTag: importedHandlers.handleTemplateTag,
  templateText: importedHandlers.handleTemplateText,
  templateExpression: importedHandlers.handleTemplateExpression,
  templateFor: importedHandlers.handleTemplateFor,
  templateIf: importedHandlers.handleTemplateIf,
  templateElseIf: importedHandlers.handleTemplateElseIf,
  templateElse: importedHandlers.handleTemplateElse,
} satisfies Handlers

type _FindHandler<Data extends Parameters<Handlers[keyof Handlers]>[number]> = {
  [SchemaName in AllSchemaNames as GetSchema<SchemaName> extends Data ? SchemaName : never]: typeof handlers[SchemaName & keyof typeof handlers]
}
type FindHandler<Data extends Parameters<Handlers[keyof Handlers]>[number]> = _FindHandler<Data>[keyof _FindHandler<Data>]

export const handle = <Data extends Parameters<Handlers[keyof Handlers]>[number]>(
  data: Data,
): ReturnType<FindHandler<Data>> => {
  for (const _handlerName in handlers) {
    const handlerName = _handlerName as keyof typeof handlers

    const handler = handlers[handlerName] as Handle<AllSchemaNames>

    const result = schemas[`kaz${upperFirst(handlerName) as Capitalize<typeof handlerName>}Schema`].safeParse(data)

    if (result.success)
      return handler(result.data) as never
  }

  throw new Error(`No handler found for ${JSON.stringify(data.$type)}`)
}
