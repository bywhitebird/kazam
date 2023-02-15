import { gv, s } from '../../lib/voltair'
import * as Tokens from '../../tokens'

export const SingleQuotedStringSequence = s(Tokens.SingleQuoteToken, gv(Tokens.SingleQuotedStringToken), Tokens.SingleQuoteToken)
