import type { Expression } from '@whitebird/kazam-transformer-base'

import type { IHandler } from '../transformer-react'

export const handleExpression: IHandler<typeof Expression> = async (expression) => {
  try {
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${expression}`)()

    if (typeof result === 'string')
      return `"${result}"`
  }
  catch { }

  return expression
}
