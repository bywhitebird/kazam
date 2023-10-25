import * as path from 'node:path'

import { describe, expect, test } from 'vitest'

import { ParserKaz } from '../src'

describe('parser-kaz', () => {
  const config = {
    input: [
      // test include a directory
      path.join(__dirname, 'fixtures'),
      // test include a subdirectory
      path.join(__dirname, 'fixtures', 'buttons'),
      // test include a file
      path.join(__dirname, 'fixtures', 'Input.kaz'),
    ],
    output: 'dist',
    configPath: __filename,
  }

  const parser = new ParserKaz()

  describe('loadAndParse', () => {
    test('should return an object of ASTs with keys relative to the input path', async () => {
      const result = await parser.loadAndParse(config)

      Object.values(result).forEach((ast) => {
        expect(ast.$type).toBe('Kaz')
      })

      expect(result).toMatchObject({
        'Input.kaz': expect.any(Object),
        'PrimaryButton.kaz': expect.any(Object),
        'SecondaryButton.kaz': expect.any(Object),
        'buttons/PrimaryButton.kaz': expect.any(Object),
        'buttons/SecondaryButton.kaz': expect.any(Object),
      })
    })
  })
})
