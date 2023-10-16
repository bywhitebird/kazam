import { ParserBase } from '@whitebird/kazam-parser-base'
import { TransformerBase } from '@whitebird/kazam-transformer-base'
import { z } from 'zod'

import type { Parser } from '../../types/parser'
import type { Transformer } from '../../types/transformer'

const transformerSchema = z.custom<Transformer>(
  v => typeof v === 'function' && v.prototype instanceof TransformerBase,
  { message: 'Must be an instance of TransformerBase' },
)

const parserSchema = z.custom<Parser>(
  v => typeof v === 'function' && v.prototype instanceof ParserBase,
  { message: 'Must be an instance of ParserBase' },
)

const singleKazamConfigSchema = z.object({
  input: z.string().array(),
  output: z.string(),
  transformers: z.array(transformerSchema),
  parsers: z.array(parserSchema),
})

export const kazamConfigSchema = z.union([
  singleKazamConfigSchema,
  z.array(singleKazamConfigSchema),
])
