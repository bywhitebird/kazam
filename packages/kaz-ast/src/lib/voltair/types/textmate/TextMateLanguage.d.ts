import type { TextMateScope } from './TextMateScope'

export type TextMateName = TextMateScope | string

export type TextMateCaptures = Record<string, { name?: TextMateName; patterns?: TextMatePattern[] }>

export type TextMatePattern = {
  comment?: string
  disabled?: 0 | 1
  include?: string
  name?: TextMateName
  captures?: TextMateCaptures
  patterns?: TextMatePattern[]
} & (
  | (
    { begin: string }
    & (
      | { endCaptures?: TextMateCaptures; end: string; applyEndPatternLast?: 0 | 1; while?: undefined }
      | { whileCaptures?: TextMateCaptures; while: string; end?: undefined }
    )
    & { contentName?: TextMateName }
    & { beginCaptures?: TextMateCaptures }
  )
  | { match?: string }
  | {}
)

export interface TextMateGrammar {
  patterns: TextMatePattern[]
  repository?: Record<string, TextMatePattern>
}

export interface TextMateLanguage extends TextMateGrammar {
  $schema?: 'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json'
  name?: string
  scopeName: `${'source' | 'text'}.${string}`
  foldingStartMarker?: string
  foldingStopMarker?: string
  fileTypes?: string[]
  uuid?: string
  firstLineMatch?: string
}
