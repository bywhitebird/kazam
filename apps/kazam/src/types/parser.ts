import type { ParserBase } from '@whitebird/kazam-parser-base'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Parser = new (...args: ConstructorParameters<typeof ParserBase>) => ParserBase<unknown, any>
