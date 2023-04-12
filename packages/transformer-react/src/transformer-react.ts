import { schemas } from '@whitebird/kaz-file-parser'
import { type ITransformerOutput, TransformerBase } from '@whitebird/kazam-transformer-base'
import type { z } from 'zod'

import * as handlers from './handlers'
import { type ImportInfos, importsToString, mergeImports } from './utils/imports-to-string'

interface IComponentMeta { name: string }

type TLowercaseFirst<T extends string> = T extends `${infer U}${infer V}` ? `${Lowercase<U>}${V}` : T
type TUppercaseFirst<T extends string> = T extends `${infer U}${infer V}` ? `${Uppercase<U>}${V}` : T
type TSchemaName<T extends string> = T extends `kaz${infer U}Schema` ? TLowercaseFirst<U> : never

type THandlerReturnType = unknown
type ISchemaHandlers = {
  [
  key in TSchemaName<keyof typeof schemas> as z.infer<typeof schemas[`kaz${TUppercaseFirst<key>}Schema`]> extends { $type: string }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ? typeof schemas[`kaz${TUppercaseFirst<key>}Schema`] extends z.ZodUnion<infer _>
      ? never
      : key
    : never
  ]:
  (data: z.infer<typeof schemas[`kaz${TUppercaseFirst<key>}Schema`]>, { handle, addImport }: {
    handle: (input: unknown | undefined) => Promise<THandlerReturnType>
    addImport: (...importInfos: ImportInfos[]) => void
    componentMeta: IComponentMeta
  }) => Promise<THandlerReturnType>
}

export type IHandler<T extends keyof ISchemaHandlers> = ISchemaHandlers[T]

export class TransformerReact extends TransformerBase {
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

  private generatedComponents: { [key: string]: string } = {}
  private imports: { [key: string]: ImportInfos[] } = {}

  async transform() {
    await Promise.all(Object.entries(this.input).map(async ([componentName, component]) => {
      const result = await this.handle(component, { name: componentName })
      this.generatedComponents[componentName] = `
        ${importsToString(mergeImports(this.imports[componentName] ?? []))}

        ${result}
      `
    }))

    return Object.entries(this.generatedComponents).reduce<ITransformerOutput>((output, [name, content]) => {
      output[`components/${name}.tsx`] = new Blob([content], { type: 'text/plain' })
      return output
    }, {})
  }

  private async handle(input: unknown | undefined, componentMeta: IComponentMeta): Promise<THandlerReturnType> {
    if (input === undefined)
      return ''

    const upperCaseFirst = <T extends string>(str: T): TUppercaseFirst<T> => ((str[0] ?? '').toUpperCase() + str.slice(1)) as TUppercaseFirst<T>

    for (const handlerName in this.handlers) {
      const handler = this.handlers[handlerName as keyof ISchemaHandlers]
      const result = schemas[`kaz${upperCaseFirst(handlerName as keyof ISchemaHandlers)}Schema`].safeParse(input)
      if (result.success) {
        return handler(result.data as never, {
          handle: input => this.handle(input, componentMeta),
          addImport: (...importInfos) => this.addImport(componentMeta.name, ...importInfos),
          componentMeta,
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

  private addImport(componentName: string, ...importInfos: ImportInfos[]) {
    this.imports[componentName] = [
      ...(this.imports[componentName] ?? []),
      ...importInfos,
    ]
  }
}
