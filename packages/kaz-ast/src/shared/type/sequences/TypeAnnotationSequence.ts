import { ColonTypeAnnotationToken, TypeToken } from '..'
import { gv, s } from '../../../lib/voltair'

export const TypeAnnotationSequence = s(
  ColonTypeAnnotationToken,
  gv(TypeToken),
)
