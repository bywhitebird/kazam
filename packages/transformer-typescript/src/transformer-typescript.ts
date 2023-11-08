import * as schemas from '@whitebird/kaz-ast'
import { TransformerBase } from '@whitebird/kazam-transformer-base'
import type { z } from 'zod'

import * as handlers from './handlers'
import { type TUppercaseFirst, upperFirst } from './utils/upperFirst'

interface IComponentMeta { name: string }

interface Mapping {
  sourceRange: [number, number]
  generatedRange: [number, number]
}

type TLowercaseFirst<T extends string> = T extends `${infer U}${infer V}` ? `${Lowercase<U>}${V}` : T
type TSchemaName<T extends string> = T extends `kaz${infer U}Schema` ? TLowercaseFirst<U> : never

export type THandlerReturnType = void
type ISchemaHandlers = {
  [
  key in TSchemaName<keyof typeof schemas> as z.infer<typeof schemas[`kaz${TUppercaseFirst<key>}Schema`]> extends { $type: string }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ? typeof schemas[`kaz${TUppercaseFirst<key>}Schema`] extends z.ZodUnion<infer _>
      ? never
      : key
    : never
  ]:
  (data: z.infer<typeof schemas[`kaz${TUppercaseFirst<key>}Schema`]>, { handle, componentMeta }: {
    handle: (input: unknown | undefined) => THandlerReturnType
    addGeneratedContent: (content: string | {
      $range: [number, number]
      $value: string
    }) => void
    componentMeta: IComponentMeta
    options: typeof TransformerTypescript.prototype.options
  }) => THandlerReturnType
}

export type IHandler<T extends keyof ISchemaHandlers> = ISchemaHandlers[T]

export class TransformerTypescript extends TransformerBase<
  { outputFileNameFormat: `${string}.ts` },
  { withKazamInternalJsDoc: boolean }
> {
  private handlers: ISchemaHandlers = {
    ast: handlers.handleKaz,
    computedInstruction: handlers.handleComputedInstruction,
    importInstruction: handlers.handleImportInstruction,
    defaultImport: handlers.handleDefaultImport,
    namedImport: handlers.handleNamedImport,
    namespaceImport: handlers.handleNamespaceImport,
    propInstruction: handlers.handlePropInstruction,
    stateInstruction: handlers.handleStateInstruction,
    watchInstruction: handlers.handleWatchInstruction,
    lifecycleEventInstruction: handlers.handleLifecycleEventInstruction,
    templateTagAttribute: handlers.handleTemplateTagAttribute,
    templateTagEventAttribute: handlers.handleTemplateTagEventAttribute,
    templateTag: handlers.handleTemplateTag,
    templateText: handlers.handleTemplateText,
    templateExpression: handlers.handleTemplateExpression,
    templateFor: handlers.handleTemplateFor,
    templateIf: handlers.handleTemplateIf,
    templateElseIf: handlers.handleTemplateElseIf,
    templateElse: handlers.handleTemplateElse,
  }

  private generatedContent: { [key: string]: string } = {}
  private mappings: { [key: string]: Mapping[] } = {}

  /**
   * @deprecated Use `transformAndGenerateMappings` instead.
   */
  override transform(): never {
    throw new Error('Method not implemented. Use `transformAndGenerateMappings` instead.')
  }

  transformAndGenerateMappings(): {
    [key: `${string}.ts`]: { content: string; mapping: Mapping[] }
  } {
    for (const componentName in this.input) {
      const component = this.input[componentName]

      if (component === undefined)
        continue

      this.handle(component.ast, { name: componentName })
    }

    return Object.entries(this.generatedContent).reduce<{
      [key: `${string}.ts`]: { content: string; mapping: Mapping[] }
    }>((acc, [componentName, content]) => {
      acc[`${componentName}.ts`] = {
        content,
        mapping: this.mappings[componentName] ?? [],
      }

      return acc
    }, {})
  }

  private handle(input: unknown | undefined, componentMeta: IComponentMeta): THandlerReturnType {
    if (input === undefined)
      return

    for (const handlerName in this.handlers) {
      const handler = this.handlers[handlerName as keyof ISchemaHandlers]

      const parseResult = schemas[`kaz${upperFirst(handlerName as keyof ISchemaHandlers)}Schema`].safeParse(input)
      if (parseResult.success) {
        return handler(parseResult.data as never, {
          handle: input => this.handle(input, componentMeta),
          addGeneratedContent: content => this.addGeneratedContent(content, componentMeta),
          componentMeta,
          options: this.options,
        })
      }
    }

    let inputString: string

    try {
      inputString = JSON.stringify(input)
    }
    catch {
      inputString = input?.toString() ?? ''
    }

    throw new Error(`No handler found for input ${inputString}`)
  }

  private addGeneratedContent(content: string | {
    $range: [number, number]
    $value: string
  }, componentMeta: IComponentMeta): void {
    const currentContent = this.generatedContent[componentMeta.name] ?? ''

    if (typeof content === 'string') {
      this.generatedContent[componentMeta.name] = `${currentContent}${content}`
    }
    else {
      this.generatedContent[componentMeta.name] = `${currentContent}${content.$value}`
      this.mappings[componentMeta.name] = [
        ...(this.mappings[componentMeta.name] ?? []),
        {
          sourceRange: content.$range,
          generatedRange: [currentContent.length, currentContent.length + content.$value.length],
        },
      ]
    }
  }
}
