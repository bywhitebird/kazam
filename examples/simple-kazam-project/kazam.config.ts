import { ParserKaz } from '@whitebird/kazam-parser-kaz'
import { TransformerReact } from '@whitebird/kazam-transformer-react'
import { defineConfig } from 'kazam'

export default defineConfig({
  input: ['src/components'],
  output: 'dist',
  transformers: [TransformerReact],
  parsers: [ParserKaz],
})
