import { TagAttributeEqualToken, TagAttributeLeftCurlyBracketToken, TagAttributeNameToken, TagAttributeRightCurlyBracketToken, TagEventAttributeSequence } from '..'
import { g, gp, gv, s } from '../../../lib/voltair'
import { ExpressionToken, StringSequence } from '../../../shared'

export const TagAttributeSequence = s.union([
  () => TagEventAttributeSequence,
  gp(
    'TagAttribute',
    s(
      g('name', () => TagAttributeNameToken),
      s.union([
        s(
          TagAttributeEqualToken,
          s.union([
            g('value', () => StringSequence),
            s(
              TagAttributeLeftCurlyBracketToken,
              g('expression', () => ExpressionToken),
              TagAttributeRightCurlyBracketToken,
            ),
          ]),
        ),
        g('value', s(gv(true))),
      ]),
    ),
  ),
])
