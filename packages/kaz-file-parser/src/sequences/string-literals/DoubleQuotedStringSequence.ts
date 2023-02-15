import { gv, s } from '../../lib/voltair'
import * as Tokens from '../../tokens'

export const DoubleQuotedStringSequence = s(Tokens.DoubleQuoteToken, gv(Tokens.DoubleQuotedStringToken), Tokens.DoubleQuoteToken)
