import path from 'node:path';
import FS from 'memfs';
import * as kazam from "kazam"
import { findParsersByNames } from './find-parsers';
import { findNameByTransformer, findTransformersByNames } from './find-transformers';

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
    const fsId = Math.random().toString(36).substring(7)
    const fs = FS.fs

    for (let { path: filePath, content } of files) {
      if (!filePath.startsWith('/')) {
        filePath = '/' + filePath
      }

      await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
      await fs.promises.writeFile(filePath, content, {
        encoding: 'base64',
      })
    }

    for (const transformer of transformers) {
      const transformerName = findNameByTransformer(transformer)

      if (transformerName === undefined) {
        throw new Error('Transformer not found')
      }

      console.log({
        parsers,
        transformers: [transformer],
        input: files.map(({ path }) => path),
        output: `output-${fsId}`,
        rootDir: '/',
      })

      const components = await kazam.generate({
        parsers,
        transformers: [transformer],
        input: files.map(({ path }) => path),
        output: `output-${fsId}`,
        rootDir: '/',
      // @ts-expect-error LightningFS is not compatible with NodeFS, but it's good enough for our purposes
      }, fs)

      generatedComponents[transformerName] ??= []

      generatedComponents[transformerName]!.push(
        ...components.flatMap(component => Array.from(component.values()))
      )
    }
  }

  return generatedComponents
}
