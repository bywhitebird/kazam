import { Effect } from 'effect'

import type { Handle } from '../handle'

export const handleTemplateText = (
  templateText => Effect.succeed(templateText.text.$value)
) satisfies Handle<'templateText'>
