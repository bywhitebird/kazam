import { gv } from '../../classes/groups/GroupValue'
import { s } from '../../classes/Sequence'
import * as Tokens from '../../tokens'

export const SingleQuotedStringSequence = s(Tokens.SingleQuoteToken, gv(Tokens.SingleQuotedStringToken), Tokens.SingleQuoteToken)
