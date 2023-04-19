import { ParserBase } from '@whitebird/kazam-parser-base'
import { TransformerBase } from '@whitebird/kazam-transformer-base'
import { z } from 'zod'

type Transformer = new (...args: ConstructorParameters<typeof TransformerBase>) => TransformerBase
type Parser = new (...args: ConstructorParameters<typeof ParserBase>) => ParserBase

const transformerSchema = z.custom<Transformer>(
  v => typeof v === 'function' && v.prototype instanceof TransformerBase,
  { message: 'Must be an instance of TransformerBase' },
)

const parserSchema = z.custom<Parser>(
  v => typeof v === 'function' && v.prototype instanceof ParserBase,
  { message: 'Must be an instance of ParserBase' },
)

// const fsPathSchema = z.string().refine(
//   v => fs.existsSync(v),
//   { message: 'File does not exist' },
// )

// const filePathSchema = fsPathSchema.refine(
//   v => fs.statSync(v).isFile(),
//   { message: 'Must be a file' },
// )

// const directoryPathSchema = fsPathSchema.refine(
//   v => fs.statSync(v).isDirectory(),
//   { message: 'Must be a directory' },
// )

const configSchema = z.object({
  input: z.string().array(),
  output: z.string(),
  transformers: z.array(transformerSchema).nonempty(),
  parsers: z.array(parserSchema).nonempty(),
  // vite: z.union([filePathSchema, z.boolean()]).default(false),
})

export type KazamConfig = z.infer<typeof configSchema>
export type UserConfig = z.input<typeof configSchema>

export const defineConfig = (config: UserConfig) => configSchema.parse(config)
