import { ParserKaz } from '@whitebird/kazam-parser-kaz'
import { TransformerReact } from '@whitebird/kazam-transformer-react'
import { TransformerVue } from '@whitebird/kazam-transformer-vue'
import { defineConfig } from 'kazam'

export default defineConfig({
  input: ['./src/components'],
  output: './dist',
  parsers: [ParserKaz],
  transformers: [TransformerReact, TransformerVue],
})
