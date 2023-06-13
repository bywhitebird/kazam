import vm from 'node:vm'

import type { testWebTransformer } from '@whitebird/kazam-test-web-transformer/src'
import { renderToString } from 'react-dom/server'
import typescript from 'typescript'

type RenderHtml = Parameters<typeof testWebTransformer>[1]
type ITransformerOutput = Parameters<RenderHtml>[0]
type FlattenedOutput = Record<string, string>

export const renderTransformerReactOutputToHtml: RenderHtml = async (output) => {
  const flattenedOutput = await flattenOutput(output)

  const indexTsx = findOutput(flattenedOutput, 'Index.tsx')
  const indexJs = compileTsx(indexTsx)

  const jsContext = createJsContext(flattenedOutput)
  const result = runJs(indexJs, jsContext)

  const Index = findIndexComponent(result)

  const html = renderToString(Index())

  return html
}

async function flattenOutput(
  output: ITransformerOutput,
  parentPath = '',
): Promise<FlattenedOutput> {
  const flattenedOutput: FlattenedOutput = {}

  if (output === undefined)
    return flattenedOutput

  for (const [key, value] of Object.entries(output)) {
    if (value instanceof Blob) {
      const blob = value as Blob
      const blobText = await blob.text()
      flattenedOutput[parentPath + value.name] = blobText
    }
    else {
      const nestedOutput = value as ITransformerOutput
      const nestedFlattenedOutput = await flattenOutput(nestedOutput, `${parentPath + key}/`)
      Object.assign(flattenedOutput, nestedFlattenedOutput)
    }
  }

  return flattenedOutput
}

function findIndexComponent(result: any) {
  const Index = result.Index

  if (Index === undefined)
    throw new Error('Index component not found')

  if (typeof Index !== 'function')
    throw new Error('Index is not a function')

  return Index
}

function runJs(
  jsText: string,
  jsContext: vm.Context,
) {
  const script = new vm.Script(`() => { const exports = {};\n${jsText}; return exports; }`)
  const result = script.runInContext(jsContext)()
  return result
}

function compileTsx(tsxSource: string) {
  const typescriptOptions: typescript.CompilerOptions = {
    jsx: typescript.JsxEmit.React,
    module: typescript.ModuleKind.CommonJS,
    target: typescript.ScriptTarget.ESNext,
  }

  const jsText = typescript.transpileModule(
    tsxSource,
    {
      compilerOptions: typescriptOptions,
    },
  ).outputText

  return jsText
}

function createJsContext(output: FlattenedOutput) {
  const jsContext = vm.createContext({
    require: createCustomRequire(output, () => jsContext),
  })

  return jsContext
}

function createCustomRequire(
  output: FlattenedOutput,
  getJsContext: () => vm.Context,
): NodeRequire {
  const customRequire = Object.assign(
    (id: string) => {
      try {
        const foundOutput = findOutput(output, id)

        const jsContext = getJsContext()
        const jsText = compileTsx(foundOutput)
        return runJs(jsText, jsContext)
      }
      catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        return require(id)
      }
    },
    require,
  )

  return customRequire
}

function findOutput(
  output: FlattenedOutput,
  id: string,
): string {
  const foundOutput = output[id]

  if (foundOutput === undefined)
    throw new Error(`Output not found: ${id}`)

  return foundOutput
}
