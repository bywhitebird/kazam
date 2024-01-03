import type { TransformerBase } from '@whitebird/kazam-transformer-base'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Transformer = new (...args: ConstructorParameters<typeof TransformerBase>) => TransformerBase<{ outputFileNameFormat: string }, any>
