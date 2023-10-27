import type { kazAstSchema } from '@whitebird/kaz-ast'
import type zod from 'zod'

export interface TransformerOptions {
}

export type TransformerInput<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _Options extends TransformerSettings = TransformerSettings,
> = Record<
  string,
  {
    ast: zod.infer<typeof kazAstSchema>
    sourceAbsoluteFilePath: string
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    getTransformedOutputFilePath: (filePath: string) => string
  }
>

export type TransformerOutput<
  Settings extends TransformerSettings = TransformerSettings,
> = Map<
  string,
  {
    filePath: Settings['outputFileNameFormat']
    content: string
  }
>

export abstract class TransformerBase<
  Settings extends TransformerSettings,
  Options extends Record<string, unknown> = Record<string, never>,
> {
  constructor(
    public readonly input: TransformerInput<Settings>,
    public readonly options: Options extends Record<string, never>
      ? TransformerOptions
      : TransformerOptions & Options,
  ) {
  }

  abstract transform(): TransformerOutput<Settings>
}

interface TransformerSettings<
  OutputFileNameFormat extends string = string,
> {
  outputFileNameFormat: OutputFileNameFormat | null
}
