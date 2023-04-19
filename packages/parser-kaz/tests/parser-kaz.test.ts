import * as path from 'node:path'

import { describe, expect, test } from 'vitest'

import { ParserKaz } from '../src'

describe('parser-kaz', () => {
  const config = {
    input: [
      // test include a directory
      path.join(__dirname, 'fixtures', 'buttons'),
      // test include a file
      path.join(__dirname, 'fixtures', 'Input.kaz'),
    ],
  }

  const parser = new ParserKaz()

  describe('load', () => {
    test('should return an array of file paths', async () => {
      const result = await parser.load(config)

      expect(result).toEqual(
        expect.arrayContaining([
          path.join(__dirname, 'fixtures', 'buttons', 'PrimaryButton.kaz'),
          path.join(__dirname, 'fixtures', 'buttons', 'SecondaryButton.kaz'),
          path.join(__dirname, 'fixtures', 'Input.kaz'),
        ]),
      )
    })
  })

  describe('parse', () => {
    test('should return an object of ASTs', async () => {
      const loadResult = await parser.load(config)

      const result = await parser.parse(loadResult, config)

      Object.values(result).forEach((ast) => {
        expect(ast.$type).toBe('Kaz')
      })
    })
  })
})
