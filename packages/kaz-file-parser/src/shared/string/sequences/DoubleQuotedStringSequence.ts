import { DoubleQuoteToken, DoubleQuotedStringToken } from '..'
import { gv, s } from '../../../lib/voltair'

export const DoubleQuotedStringSequence = s(DoubleQuoteToken, gv(DoubleQuotedStringToken), DoubleQuoteToken)
