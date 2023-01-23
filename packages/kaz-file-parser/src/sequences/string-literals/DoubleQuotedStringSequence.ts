import * as Tokens from '../../tokens'
import { createSequence as s } from '../utils/create-sequence'

export const DoubleQuotedStringSequence = s(Tokens.DoubleQuoteToken, Tokens.DoubleQuotedStringToken, Tokens.DoubleQuoteToken)
