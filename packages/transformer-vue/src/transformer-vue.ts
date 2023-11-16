import * as path from 'node:path'

import * as schemas from '@whitebird/kaz-ast'
import { replaceKazamMagicStrings } from '@whitebird/kazam-transform-utils'
import { TransformerBase } from '@whitebird/kazam-transformer-base'
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
  (data: z.infer<typeof schemas[`kaz${TUppercaseFirst<key>}Schema`]>, { handle, addImport, checkIsComponent, componentMeta }: {
    handle: (input: unknown | undefined) => THandlerReturnType
    addImport: (...importInfos: ImportInfos[]) => void
    checkIsComponent: (componentName: string) => boolean
    importComponent: (componentName: string) => void
    componentMeta: IComponentMeta
  }) => THandlerReturnType
}

export type IHandler<T extends keyof ISchemaHandlers> = ISchemaHandlers[T]

export class TransformerVue extends TransformerBase<{
  outputFileNameFormat: `${string}.vue`
}> {
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

  private generatedComponents: { [key: string]: string } = {}
  private imports: { [key: string]: ImportInfos[] } = {}

  private getComponentName(componentId: string) {
    const componentPath = this.getComponentOutputPath(componentId)

    if (componentPath === undefined)
      return

    return path.basename(componentPath, path.extname(componentPath))
  }

  transform() {
    for (const componentId in this.input) {
      const component = this.input[componentId]

      if (component === undefined)
        continue

      const result = this.handle(component.ast, { name: componentId })

      const unformattedResult = `
      ${importsToString(
        mergeImports(this.imports[componentId] ?? []),
        component.sourceAbsoluteFilePath,
        component.getTransformedOutputFilePath(`${componentId}.vue`),
      )}

      ${result}
      `

      this.generatedComponents[componentId] = `
        <script lang="ts">\n${prettier.format(
        replaceKazamMagicStrings(unformattedResult, {
          getComputed(_match, computedName) {
            return `${computedName}.value`
          },
          getState(_match, stateName) {
            return `${stateName}.value`
          },
          setState(_match, stateName, setter) {
            return `${stateName}.value = ((${stateName}) => { ${setter}; return ${stateName} })(ref(unref(${stateName})))`
          },
          getProp(_match, propName) {
            return `${propName}.value`
          },
        }),
        {
          parser: 'babel-ts',
          printWidth: Number.POSITIVE_INFINITY,
        },
      )
        }</script>
      `.trim()
    }

    return Object.entries(this.generatedComponents).reduce(
      (output, [id, content]) =>
        output.set(id, {
          content,
          filePath: `${id}.vue`,
        }),
      new Map<string, {
        filePath: `${string}.vue`
        content: string
      }>(),
    )
  }

  private handle(input: unknown | undefined, componentMeta: IComponentMeta): THandlerReturnType {
    if (input === undefined)
      return ''

    for (const handlerName in this.handlers) {
      const handler = this.handlers[handlerName as keyof ISchemaHandlers]

      const result = schemas[`kaz${upperFirst(handlerName as keyof ISchemaHandlers)}Schema`].safeParse(input)
      if (result.success) {
        return handler(result.data as never, {
          handle: input => this.handle(input, componentMeta),
          addImport: (...importInfos) => this.addImport(componentMeta.name, ...importInfos),
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

  private getComponentOutputPath(componentId: string) {
    return this.input[componentId]?.getTransformedOutputFilePath(`${componentId}.vue`)
  }

  private checkIsComponent(componentName: string): boolean {
    return Object.keys(this.input).some(componentId => this.getComponentName(componentId) === componentName)
  }

  private async importComponent(componentName: string, componentMeta: IComponentMeta) {
    const sourceComponentPath = this.getComponentOutputPath(componentMeta.name)
    const targetComponentPath = this.getComponentOutputPath(
      Object.keys(this.input)
        .find(componentId =>
          path.basename(componentId, path.extname(componentId)) === componentName,
        ) ?? '',
    )

    if (targetComponentPath === undefined || sourceComponentPath === undefined)
      return

    const relativePath = path.relative(
      path.dirname(sourceComponentPath),
      targetComponentPath,
    )

    this.addImport(componentMeta.name, {
      defaultImport: {
        name: componentName,
      },
      path: `./${relativePath}`,
      relativizePath: false,
    })
  }

  private addImport(componentName: string, ...importInfos: ImportInfos[]) {
    this.imports[componentName] = [
      ...(this.imports[componentName] ?? []),
      ...importInfos,
    ]
  }
}
