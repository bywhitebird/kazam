import { TagAttributeEqualToken, TagAttributeLeftCurlyBracketToken, TagAttributeNameToken, TagAttributeRightCurlyBracketToken } from '..'
import { g, gp, gv, s } from '../../../lib/voltair'
import { ExpressionToken, StringSequence } from '../../../shared'

export const TagAttributeSequence = gp(
  'TagAttribute',
  s(
    g('name', () => TagAttributeNameToken),
    // g(
    //   'value',
    //   s.union([
    //     s(
    //       TagAttributeEqualToken,
    //       s.union([
    //         () => StringSequence,
    //         s(
    //           TagAttributeLeftCurlyBracketToken,
    //           () => ExpressionToken,
    //           TagAttributeRightCurlyBracketToken,
    //         ),
    //       ]),
    //     ),
    //     gv(true),
    //   ]),
    // ),
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
)
