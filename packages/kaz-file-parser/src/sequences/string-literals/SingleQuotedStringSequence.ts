import * as Tokens from '../../tokens'
import { createSequence as s } from '../utils/create-sequence'

export const SingleQuotedStringSequence = s(Tokens.SingleQuoteToken, Tokens.SingleQuotedStringToken, Tokens.SingleQuoteToken)
