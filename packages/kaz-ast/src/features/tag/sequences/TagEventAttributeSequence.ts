import { TagAttributeEqualToken, TagAttributeLeftCurlyBracketToken, TagAttributeRightCurlyBracketToken, TagEventAttributeNameToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { ExpressionToken } from '../../../shared'

export const TagEventAttributeSequence = gp(
  'TagEventAttribute',
  s(
    g('name', () => TagEventAttributeNameToken),
    TagAttributeEqualToken,
    s(
      TagAttributeLeftCurlyBracketToken,
      g('expression', () => ExpressionToken),
      TagAttributeRightCurlyBracketToken,
    ),
    {
      tmScope: 'meta.tag.attribute.event',
      tmName: 'TagEventAttribute',
    },
  ),
)
