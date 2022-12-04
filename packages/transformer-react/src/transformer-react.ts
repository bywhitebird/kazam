import {
  Attribute,
  Component,
  Computed,
  Content,
  Event,
  Expression,
  type IComponent,
  type ITransformerOutput,
  Props,
  State,
  TransformerBase,
  Watcher,
} from '@whitebird/kazam-transformer-base'
import type { z } from 'zod'

import * as handlers from './handlers'
import { type ImportInfos, importsToString, mergeImports } from './utils/imports-to-string'

interface ISchemaHandler<S extends z.ZodType = z.ZodType> {
  schema: S
  handler: (data: z.infer<S>, helpers: {
    handle: TransformerReact['handle']
    addImport: TransformerReact['addImport']
    component: IComponent
  }) => Promise<string>
}

export type IHandler<S extends z.ZodType = z.ZodType> = ISchemaHandler<S>['handler']

export class TransformerReact extends TransformerBase {
  private handlers: ISchemaHandler[] = [
    { schema: Attribute, handler: handlers.handleAttribute },
    { schema: Component, handler: handlers.handleComponent },
    { schema: Computed, handler: handlers.handleComputed },
    { schema: Content, handler: handlers.handleContent },
    { schema: Event, handler: handlers.handleEvent },
    { schema: Expression, handler: handlers.handleExpression },
    { schema: Props, handler: handlers.handleProps },
    { schema: State, handler: handlers.handleState },
    { schema: Watcher, handler: handlers.handleWatcher },
  ]

  private generatedComponents: { [key: string]: string } = {}
  private imports: { [key: string]: ImportInfos[] } = {}

  async transform() {
    const components: IComponent[] = this.input

    await Promise.all(components.map(async (component) => {
      const result = await this.handle(component, component)
      this.generatedComponents[component.name] = `
        ${importsToString(mergeImports(this.imports[component.name] ?? []))}

        ${result}
      `
    }))

    return Object.entries(this.generatedComponents).reduce<ITransformerOutput>((output, [name, content]) => {
      output[`components/${name}.tsx`] = new Blob([content], { type: 'text/plain' })
      return output
    }, {})
  }

  private async handle(input: unknown | undefined, component: IComponent): Promise<string> {
    if (input === undefined)
      return ''

    for (const handler of this.handlers) {
      const result = handler.schema.safeParse(input)
      if (result.success) {
        return handler.handler(result.data, {
          handle: this.handle.bind(this),
          addImport: this.addImport.bind(this),
          component,
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
