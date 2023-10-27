import type { ParserBase } from '@whitebird/kazam-parser-base'

export type Parser = new (...args: ConstructorParameters<typeof ParserBase>) => ParserBase<unknown>
