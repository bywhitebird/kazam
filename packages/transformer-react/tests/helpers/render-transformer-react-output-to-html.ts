import type { testWebTransformer } from '@whitebird/kazam-test-web-transformer/src'
import * as esbuild from 'esbuild'

type RenderHtml = Parameters<typeof testWebTransformer>[1]
type ITransformerOutput = Parameters<RenderHtml>[0]
type FlattenedOutput = Record<string, string>

export const renderTransformerReactOutputToHtml: RenderHtml = async (output) => {
  const flattenedOutput = await flattenOutput(output)

  const indexTsx = findOutput(flattenedOutput, 'Index.tsx')

  const { outputFiles } = await buildTsx(
    formatTsxForClient(indexTsx),
    flattenedOutput,
  )
  const indexJs = outputFiles.find(({ path }) => path.endsWith('out.js'))?.text

  if (indexJs === undefined)
    throw new Error('Could not find out.js')

  const html = jsToHtml(indexJs)

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

function findOutput(
  output: FlattenedOutput,
  id: string,
): string {
  const foundOutput = output[id]

  if (foundOutput === undefined)
    throw new Error(`Output not found: ${id}`)

  return foundOutput
}

function formatTsxForClient(
  tsx: string,
): string {
  return `
    import ReactDOM from 'react-dom/client';

    ${tsx}

    const root = ReactDOM.createRoot(
      document.getElementById('root')
    );
    root.render(<Index />);
  `
}

function buildTsx(
  sourceTsx: string,
  output: FlattenedOutput,
) {
  return esbuild.build({
    bundle: true,
    stdin: {
      contents: sourceTsx,
      resolveDir: __dirname,
      loader: 'tsx',
    },
    plugins: [resolveOutputPlugin(output)],
    write: false,
    outfile: 'out.js',
    target: 'es2015',
  })
}

function resolveOutputPlugin(
  output: FlattenedOutput,
): esbuild.Plugin {
  return {
    name: 'resolveOutput',
    setup(build) {
      Object.entries(output).forEach(([id, content]) => {
        const resolveResult: esbuild.OnResolveResult = {
          path: id,
          namespace: 'resolveOutput',
        }

        build.onResolve(
          { filter: new RegExp(`^\.\/${id}$`) },
          () => resolveResult,
        )
      })

      build.onLoad({ filter: /.*/, namespace: 'resolveOutput' }, async (args) => ({
          contents: output[args.path],
          loader: 'tsx',
          resolveDir: __dirname,
      }))
    },
  }
}

function jsToHtml(
  js: string,
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>React App</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript">
          ${js}
        </script>
      </body>
    </html>
  `
}
