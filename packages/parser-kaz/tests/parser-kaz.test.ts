import * as path from 'node:path'

import { kazamMagicStrings } from '@whitebird/kazam-transform-utils'
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
    rootDir: __dirname,
  }

  const parser = new ParserKaz()

  describe('loadAndParse', () => {
    test('should return an object of objects with AST and absolute input path with keys relative to the input path', async () => {
      const result = await parser.loadAndParse(config)

      Object.values(result).forEach(({ ast, sourceAbsoluteFilePath }) => {
        expect(ast.$type).toBe('Kaz')
        expect(sourceAbsoluteFilePath).toSatisfy(path.isAbsolute)
        expect(sourceAbsoluteFilePath).toMatch(/^\/.+fixtures\/(Input|buttons\/PrimaryButton|buttons\/SecondaryButton)\.kaz$/)
      })

      expect(result).toMatchObject({
        'Input.kaz': expect.any(Object),
        'PrimaryButton.kaz': expect.any(Object),
        'SecondaryButton.kaz': expect.any(Object),
        'buttons/PrimaryButton.kaz': expect.any(Object),
        'buttons/SecondaryButton.kaz': expect.any(Object),
      })
    })

    test('should have the magic string in the expression that sets a state', async () => {
      const result = await parser.loadAndParse(config)

      const inputElement = result['Input.kaz'].ast.template[0]

      if (inputElement.$type !== 'Tag')
        throw new Error('inputElement.$type !== "Tag"')

      const onChangeAttribute = inputElement.attributes[0]

      if (onChangeAttribute.$type !== 'TagEventAttribute')
        throw new Error('onChangeAttribute.$type !== "TagEventAttribute"')

      const setStateMagicStrings = Array.from(onChangeAttribute.expression.$value.matchAll(kazamMagicStrings.setState.regexp))

      expect(setStateMagicStrings).toHaveLength(2)
      expect(kazamMagicStrings.setState.parse(setStateMagicStrings[0][0])).toEqual(['value', 'value = event.target.value'])
      expect(kazamMagicStrings.setState.parse(setStateMagicStrings[1][0])).toEqual(['old', `old = ${kazamMagicStrings.getState.create('value')}`])
    })
  })
})
