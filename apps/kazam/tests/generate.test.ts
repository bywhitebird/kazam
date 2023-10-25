import * as fs from 'node:fs'
import * as path from 'node:path'

import { ParserKaz } from '@whitebird/kazam-parser-kaz'
import { TransformerReact } from '@whitebird/kazam-transformer-react'
import { afterEach, describe, expect, test } from 'vitest'

import { generate } from '../src'

const baseKazamConfig = {
  parsers: [ParserKaz] as [typeof ParserKaz],
  transformers: [TransformerReact] as [typeof TransformerReact],
  output: path.join(__dirname, 'output'),
}

describe('kazam', () => {
  describe('generate', () => {
    afterEach(() => {
      fs.rmSync(baseKazamConfig.output, { recursive: true, force: true })
    })

    test('should build the .kaz files in transformer specific directories', async () => {
      await generate({
        ...baseKazamConfig,
        input: [path.join(__dirname, 'fixtures')],
        rootDir: __dirname,
      }, fs)

      expect(path.join(baseKazamConfig.output, 'react', 'Button.tsx')).toSatisfy(fs.existsSync)
      expect(path.join(baseKazamConfig.output, 'react', 'Input.tsx')).toSatisfy(fs.existsSync)
    }, {
      timeout: 30000, // This should not take as long as 30 seconds, but in CI it is very slow
    })
  })
})
