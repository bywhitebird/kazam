import type { TransformerBase } from '@whitebird/kazam-transformer-base'
import { assertType } from 'vitest'

import type { KazamConfig as _KazamConfig } from '../../../../apps/kazam'
import type { ParserBase } from '../parser-base'

type Transformer = new (...args: ConstructorParameters<typeof TransformerBase>) => TransformerBase
type Parser = new (...args: ConstructorParameters<typeof ParserBase>) => ParserBase

export interface KazamConfig {
  input: string[]
  output: string
  transformers: [Transformer, ...Transformer[]]
  parsers: [Parser, ...Parser[]]
}

// Following 2 lines check that KazamConfig is assignable to the type KazamConfig defined in apps/kazam
assertType<_KazamConfig>(<KazamConfig>{})
assertType<KazamConfig>(<_KazamConfig>{})
