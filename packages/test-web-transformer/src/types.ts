import type { TransformerBase } from '@whitebird/kazam-transformer-base'
import type playwright from 'playwright'

import type * as fixtures from './fixtures'

export type Transformer = new (...args: ConstructorParameters<typeof TransformerBase>) => TransformerBase<{
  outputFileNameFormat: string
}>

export type RenderHtml = (
  output: Awaited<ReturnType<TransformerBase<{
    outputFileNameFormat: string
  }>['transform']>>
) => Promise<string>

export type Fixture = typeof fixtures[keyof typeof fixtures]

export type OverridePageScreenshot = (
  takeScreenshot: playwright.Page['screenshot'],
  fixture: Awaited<Fixture>
) => playwright.Page['screenshot']
