import FS from 'memfs';
import { findParsersByNames } from "./find-parsers"
import { findNameByTransformer, findTransformersByNames } from "./find-transformers"
import { KazAst } from '@whitebird/kaz-ast';
import { compileFiles } from "./compile-files";
import { ParserKaz } from "@whitebird/kazam-parser-kaz";

export const compileAlakazamClientFiles = async ({
  folders,
  parsers,
  transformers,
}: {
  folders: { path: string, content: string }[][]
  parsers: ReturnType<typeof findParsersByNames>
  transformers: ReturnType<typeof findTransformersByNames>
}) => {
  const alakazamFolders: typeof folders = await Promise.all(folders.map(files =>
    Promise.all(files.map(async file => {
      const props: Extract<KazAst['instructions'][number], { $type: 'PropInstruction' }>[] = []

      for (const ParserClass of parsers) {
        const parser = new ParserClass()

        const parserOutput = await parser.loadAndParse({
          input: [file.path],
          output: 'output',
          rootDir: '/',
          // @ts-expect-error MemFS is not compatible with NodeFS, but it's good enough for our purposes
          fs: FS.Volume.fromJSON({
            [`${!file.path.startsWith('/') ? '/' : ''}${file.path}`]: Buffer.from(file.content, 'base64'),
          }),
        })

        const _props = Object.values(parserOutput).map(file => {
          return file.ast?.instructions.filter((instruction): instruction is typeof props[number] => instruction.$type === 'PropInstruction') ?? []
        }).flat()

        if (_props.length > 0) {
          props.push(..._props)
          break
        }
      }

      const idReference = Math.random().toString(36).substring(2, 9)

      return {
        path: `${!file.path.startsWith('/') ? '/' : ''}${file.path.split('.').slice(0, -1).join('.')}-alakazam.kaz`,
        content: Buffer.from(`
          - state id${idReference} = Math.random().toString(36).substring(2, 9)
          ${props.map(prop => {
          return String.prototype.concat(
            '- prop ',
            prop.name.$value,
            prop.type?.$value !== undefined ? `: ${prop.type.$value}` : '',
            prop.defaultValue?.expression.$value !== undefined ? ` = ${prop.defaultValue.expression.$value}` : '',
          )
        }).join('\n')}
          - onMount () => {
            const componentSelector = \`alakazam-component[id="\${id${idReference}}"]\`
            const component = document.querySelector(componentSelector)

            if (component === null) {
              throw new Error(\`Alakazam component with ID \${id${idReference}} not found\`)
            }

            const ALAKAZAM_PROPS_KEY = '_alakazamProps'

            window[ALAKAZAM_PROPS_KEY] ??= []
            window[ALAKAZAM_PROPS_KEY][id${idReference}] = {
              ${props.map(prop => `${prop.name.$value}: ${prop.name.$value},`).join('\n')}
            }

            const fetchComponent = async (componentId: string, propsAccessor: string, selector: string, signal: AbortSignal) => {
              const componentUrl = new URL(${JSON.stringify(process.env.ALAKAZAM_URL)})
              componentUrl.pathname = \`/get-component\`
              componentUrl.searchParams.set('componentId', componentId)
              componentUrl.searchParams.set('propsAccessor', propsAccessor)
              componentUrl.searchParams.set('selector', selector)

              const response = await fetch(
                componentUrl.toString(),
                {
                  signal,
                }
              )

              return await response.text()
            }

            // TODO: use AbortController to abort fetch if component is unmounted
            const abortController = new AbortController()

            fetchComponent(
              0, // TODO: Get component ID
              \`window[\${JSON.stringify(ALAKAZAM_PROPS_KEY)}][\${JSON.stringify(id)}]\`,
              componentSelector,
              abortController.signal,
            ).then(preactSource => {
              const script = document.createElement("script");
              script.type = "module";
              script.innerHTML = preactSource;
              component.appendChild(script);
            })
          }

          alakazam-component (style="display: contents", id={id${idReference}}) {}
          `, 'utf-8').toString('base64'),
      }
    }))
  ))

  return compileFiles({
    folders: alakazamFolders,
    parsers: [ParserKaz],
    transformers: transformers.filter(transformer => findNameByTransformer(transformer) !== 'alakazam'),
  })
}
