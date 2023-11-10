import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import { ParserKaz } from '@whitebird/kazam-parser-kaz'
import type { TransformerInput } from '@whitebird/kazam-transformer-base'
import type { Page } from 'playwright'
import { dir } from 'tmp-promise'

export interface TestWebTransformerFixture {
  fixtureDirectory: string
  input: TransformerInput & { 'Index': TransformerInput['Index'] }
  scenario: (page: Page) => Promise<void>
}

interface TestWebTransformerFixtureInput {
  fixtureDirectory: string
  input: { 'Index': string;[key: string]: string }
  scenario: (page: Page) => Promise<void>
}

export const createTestWebTransformerFixture = async (fixture: TestWebTransformerFixtureInput): Promise<TestWebTransformerFixture> => {
  return {
    ...fixture,
    input: Object.fromEntries(
      await Promise.all(
        Object.entries(fixture.input).map(async ([key, value]) => {
          const { path: directoryPath, cleanup: cleanupDirectory } = await dir({
            unsafeCleanup: true,
            tmpdir: fixture.fixtureDirectory,
          })
          await fs.writeFile(path.join(directoryPath, `${key}.kaz`), value)

          const parser = new ParserKaz()
          const parseResult = await parser.loadAndParse({
            input: [
              directoryPath,
            ],
            output: 'dist',
            configPath: path.join(directoryPath, 'kazam.config.ts'),
          })

          await cleanupDirectory()

          const ast = parseResult[`${key}.kaz`]?.ast

          if (ast === undefined)
            throw new Error(`Failed to parse ${key} in ${fixture.fixtureDirectory}`)

          return [key, {
            ast,
            sourceAbsoluteFilePath: '',
            getTransformedOutputFilePath: (filePath: string) => filePath,
          }] as const
        }),
      ),
    ) as TestWebTransformerFixture['input'],
  }
}
