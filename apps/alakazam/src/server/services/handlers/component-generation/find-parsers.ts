import type { ParserBase } from "@whitebird/kazam-parser-base"
import { ParserKaz } from "@whitebird/kazam-parser-kaz"

const availableParserNames = db.transformations.ParserName.__values__
const parsers = {
  kaz: ParserKaz,
} satisfies Record<typeof availableParserNames[number], typeof ParserBase<any, any>>

export const findParsersByNames = (names: (keyof typeof parsers)[]) => {
  return names.map(name => parsers[name])
}
