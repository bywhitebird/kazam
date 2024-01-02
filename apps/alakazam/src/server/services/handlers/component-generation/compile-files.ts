import FS from 'memfs';
import * as kazam from "kazam"
import { findParsersByNames } from './find-parsers';
import { findNameByTransformer, findTransformersByNames } from './find-transformers';
import { TransformerAlakazam } from '../../transformers/transformer-alakazam/transformer-alakazam';
import { compileAlakazamClientFiles } from './compile-alakazam-client-files';

export const compileFiles = async ({
  folders,
  parsers,
  transformers,
}: {
  folders: { path: string, content: string }[][]
  parsers: ReturnType<typeof findParsersByNames>
  transformers: ReturnType<typeof findTransformersByNames>
}) => {
  const generatedComponents: Record<typeof db.transformations.TransformerName.__values__[number], {
    filePath: string
    content: string
  }[] | undefined> = {} as any

  for (const files of folders) {
    const fs = FS.Volume.fromJSON(
      Object.fromEntries(
        files.map(file => 
          [
            `${!file.path.startsWith('/') ? '/' : ''}${file.path}`,
            Buffer.from(file.content, 'base64'),
          ] as const
        )
      )
    )

    for (const transformer of transformers) {
      const transformerName = findNameByTransformer(transformer)

      if (transformerName === undefined) {
        throw new Error('Transformer not found')
      }

      const components = await kazam.generate({
        parsers,
        transformers: [transformer],
        input: files.map(({ path }) => path),
        output: 'output',
        rootDir: '/',
      // @ts-expect-error MemFS is not compatible with NodeFS, but it's good enough for our purposes
      }, fs)

      generatedComponents[transformerName] ??= []

      generatedComponents[transformerName]!.push(
        ...components.flatMap(component => Array.from(component.values()))
      )
    }
  }

  if (transformers.includes(TransformerAlakazam)) {
    const alakazamClientComponents = await compileAlakazamClientFiles({
      folders,
      parsers,
      transformers,
    })

    for (const [transformerName, components] of Object.entries(alakazamClientComponents)) {
      generatedComponents[transformerName as keyof typeof generatedComponents] ??= []

      generatedComponents[transformerName as keyof typeof generatedComponents]!.push(
        ...components ?? [],
      )
    }
  }

  return generatedComponents
}
