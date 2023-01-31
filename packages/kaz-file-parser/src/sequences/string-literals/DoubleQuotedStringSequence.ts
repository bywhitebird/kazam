import { gv } from '../../classes/groups/GroupValue'
import { s } from '../../classes/Sequence'
import * as Tokens from '../../tokens'

export const DoubleQuotedStringSequence = s(Tokens.DoubleQuoteToken, gv(Tokens.DoubleQuotedStringToken), Tokens.DoubleQuoteToken)
