import { s } from '../../classes/Sequence'
import * as Tokens from '../../tokens'

export const SingleQuotedStringSequence = s(Tokens.SingleQuoteToken, Tokens.SingleQuotedStringToken, Tokens.SingleQuoteToken)
