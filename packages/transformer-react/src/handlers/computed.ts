import type { Computed } from '@whitebird/kazam-transformer-base'

import type { IHandler } from '../transformer-react'

export const handleComputed: IHandler<typeof Computed> = async (computed, { handle, component }) => {
  return `const ${computed.name} = ${await handle(computed.getterExpression, component)}`
}
