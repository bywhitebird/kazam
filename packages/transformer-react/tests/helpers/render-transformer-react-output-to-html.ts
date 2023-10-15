import type { testWebTransformer } from '@whitebird/kazam-test-web-transformer/src'
import * as esbuild from 'esbuild'

type RenderHtml = Parameters<typeof testWebTransformer>[1]

export const renderTransformerReactOutputToHtml: RenderHtml = async (output) => {
  const indexTsx = await findOutput(output, 'Index')

  const { outputFiles } = await buildTsx(
    formatTsxForClient(indexTsx),
    output,
  )
  const indexJs = outputFiles.find(({ path }) => path.endsWith('out.js'))?.text

  if (indexJs === undefined)
    throw new Error('Could not find out.js')

  const html = jsToHtml(indexJs)

  return html
}

async function findOutput(
  output: Parameters<RenderHtml>[0],
  id: string,
): Promise<string> {
  const foundOutput = output.get(id)

  if (foundOutput === undefined)
    throw new Error(`Output not found: ${id}`)

  return foundOutput.content.text()
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
  output: Parameters<RenderHtml>[0],
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
  output: Parameters<RenderHtml>[0],
): esbuild.Plugin {
  return {
    name: 'resolveOutput',
    async setup(build) {
      Array.from(output.entries()).forEach(([id]) => {
        const resolveResult: esbuild.OnResolveResult = {
          path: `${id}`,
          namespace: 'resolveOutput',
        }

        build.onResolve(
          { filter: new RegExp(`^\.\/${id}\.tsx$`) },
          () => resolveResult,
        )
      })

      build.onLoad({ filter: /.*/, namespace: 'resolveOutput' }, async (args) => {
        return {
          contents: await output.get(args.path)?.content.text() ?? '',
          loader: 'tsx',
          resolveDir: __dirname,
        }
      })
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
