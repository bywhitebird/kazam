import type { TransformerBase } from '@whitebird/kazam-transformer-base'

export type Transformer = new (...args: ConstructorParameters<typeof TransformerBase>) => TransformerBase<{ outputFileNameFormat: string }>
