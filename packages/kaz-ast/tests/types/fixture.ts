import type { JsonValue } from '../../../src/lib/voltair/types/JsonValue'

export type Fixture = {
  name: string
  input: string
} & (
  | { expectedTree: JsonValue }
  | { expectError: boolean }
)
