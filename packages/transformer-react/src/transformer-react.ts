import * as path from 'node:path'

import { schemas } from '@whitebird/kaz-ast'
import { type ITransformerOutput, TransformerBase } from '@whitebird/kazam-transformer-base'
import prettier from 'prettier'
import type { z } from 'zod'

import * as handlers from './handlers'
import { type ImportInfos, importsToString, mergeImports } from './utils/imports-to-string'
import { type TUppercaseFirst, upperFirst } from './utils/upperFirst'

interface IComponentMeta { name: string }

type TLowercaseFirst<T extends string> = T extends `${infer U}${infer V}` ? `${Lowercase<U>}${V}` : T
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
      this.generatedComponents[componentName] = prettier.format(
        `
        ${importsToString(mergeImports(this.imports[componentName] ?? []))}

        ${result}
        `,
        {
          parser: 'babel-ts',
          printWidth: Infinity,
        },
      )
    }))

    return Object.entries(this.generatedComponents).reduce<ITransformerOutput>((output, [id, content]) => {
      output[id] = Object.assign(
        new Blob([content], { type: 'text/plain' }),
        { name: `${id.slice(0, -path.extname(id).length)}.tsx` },
      )
      return output
    }, {})
  }

  private async handle(input: unknown | undefined, componentMeta: IComponentMeta): Promise<THandlerReturnType> {
    if (input === undefined)
      return ''

    for (const handlerName in this.handlers) {
      const handler = this.handlers[handlerName as keyof ISchemaHandlers]
      // eslint-disable-next-line import/namespace
      const result = schemas[`kaz${upperFirst(handlerName as keyof ISchemaHandlers)}Schema`].safeParse(input)
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
