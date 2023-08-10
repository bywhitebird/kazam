import path from 'node:path'

import * as babelParser from '@babel/parser'
import * as schemas from '@whitebird/kaz-ast'
import { type ITransformerOutput, TransformerBase } from '@whitebird/kazam-transformer-base'
import { TransformerTypescript } from '@whitebird/kazam-transformer-typescript'
import prettier from 'prettier'
import type { z } from 'zod'

import * as handlers from './handlers'
import { type ImportInfos, importsToString, mergeImports } from './utils/imports-to-string'
import { transformExpression } from './utils/transform-expression'
import { type TUppercaseFirst, upperFirst } from './utils/upperFirst'

interface IComponentMeta { name: string }

type TLowercaseFirst<T extends string> = T extends `${infer U}${infer V}` ? `${Lowercase<U>}${V}` : T
type TSchemaName<T extends string> = T extends `kaz${infer U}Schema` ? TLowercaseFirst<U> : never

type TypescriptAst = ReturnType<typeof babelParser.parse>
type TransformerTypescriptGenerated = Awaited<ReturnType<TransformerTypescript['transformAndGenerateMappings']>>[string]

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
  (data: z.infer<typeof schemas[`kaz${TUppercaseFirst<key>}Schema`]>, utils: {
    handle: (input: unknown | undefined) => Promise<THandlerReturnType>
    addImport: (...importInfos: ImportInfos[]) => void
    transformExpression: (expression: Parameters<typeof transformExpression>[0]) => Promise<string>
    checkIsComponent: (componentName: string) => Promise<boolean>
    importComponent: (componentName: string) => void
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
  private generatedTypescript: Record<string, TransformerTypescriptGenerated & { ast: TypescriptAst }> = {}

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
          printWidth: Number.POSITIVE_INFINITY,
        },
      )
    }))

    return Object.entries(this.generatedComponents).reduce<ITransformerOutput>((output, [id, content]) => {
      output[id] = Object.assign(
        new Blob([content], { type: 'text/plain' }),
        { name: `${id}.tsx` },
      )
      return output
    }, {})
  }

  private async handle(input: unknown | undefined, componentMeta: IComponentMeta): Promise<THandlerReturnType> {
    if (input === undefined)
      return ''

    for (const handlerName in this.handlers) {
      const handler = this.handlers[handlerName as keyof ISchemaHandlers]

      const result = schemas[`kaz${upperFirst(handlerName as keyof ISchemaHandlers)}Schema`].safeParse(input)
      if (result.success) {
        return handler(result.data as never, {
          handle: input => this.handle(input, componentMeta),
          addImport: (...importInfos) => this.addImport(componentMeta.name, ...importInfos),
          transformExpression: async (expression) => {
            const kazAst = this.input[componentMeta.name]

            if (kazAst === undefined)
              throw new Error(`No kazAst found for component ${componentMeta.name}`)

            const transformedToTypescript = await this.transformToTypescript(componentMeta.name)

            return transformExpression(expression, {
              kazAst,
              typescriptFileContent: transformedToTypescript?.content,
              typescriptMapping: transformedToTypescript?.mapping,
              typescriptAst: transformedToTypescript?.ast,
            })
          },
          checkIsComponent: componentName => this.checkIsComponent(componentName),
          importComponent: componentName => this.importComponent(componentName, componentMeta),
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

  private async checkIsComponent(componentName: string): Promise<boolean> {
    return Object.keys(this.input)
      .map(componentName => path.basename(componentName, path.extname(componentName)))
      .includes(componentName)
  }

  private async importComponent(componentName: string, componentMeta: IComponentMeta) {
    const relativePath = path.relative(
      path.dirname(componentMeta.name),
      path.resolve(
        path.dirname(componentMeta.name),
        `${componentName}.tsx`,
      ),
    )

    this.addImport(componentMeta.name, {
      namedImports: [
        {
          name: componentName,
        },
      ],
      path: `./${relativePath}`,
    })
  }

  private addImport(componentName: string, ...importInfos: ImportInfos[]) {
    this.imports[componentName] = [
      ...(this.imports[componentName] ?? []),
      ...importInfos,
    ]
  }

  private async transformToTypescript(componentName: string) {
    const foundGeneratedTypescript = this.generatedTypescript[componentName]
    if (foundGeneratedTypescript !== undefined)
      return foundGeneratedTypescript

    const input = this.input[componentName]

    if (input === undefined)
      throw new Error(`No input found for component ${componentName}`)

    const transformerTypescript = new TransformerTypescript({
      [componentName]: input,
    }, {})

    const result = await transformerTypescript.transformAndGenerateMappings().then(result => result[componentName])

    if (result === undefined)
      throw new Error(`No result found for component ${componentName}`)

    const ast = babelParser.parse(result.content, {
      sourceType: 'module',
      plugins: ['typescript'],
    })

    const resultWithAst = {
      ...result,
      ast,
    }

    this.generatedTypescript[componentName] = resultWithAst

    return resultWithAst
  }
}
