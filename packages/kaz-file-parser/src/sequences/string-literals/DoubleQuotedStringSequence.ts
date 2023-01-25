import { s } from '../../classes/Sequence'
import * as Tokens from '../../tokens'

export const DoubleQuotedStringSequence = s(Tokens.DoubleQuoteToken, Tokens.DoubleQuotedStringToken, Tokens.DoubleQuoteToken)
