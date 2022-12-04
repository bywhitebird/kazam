import type { Props } from '@whitebird/kazam-transformer-base'

import type { IHandler } from '../transformer-react'

export const handleProps: IHandler<typeof Props> = async (props, { handle, component }) => {
  let { declaration, type } = { declaration: '', type: '' }

  const propsEntries = Object.entries(props)
  for (let i = 0; i < propsEntries.length; i++) {
    const prop = propsEntries[i]

    if (prop === undefined)
      continue

    const [key, value] = prop

    declaration += `${key}${value.defaultValueExpression ? ` = ${await handle(value.defaultValueExpression, component)}` : ''}`
    type += `${key}: ${value.type ?? 'any'}`

    if (i !== propsEntries.length - 1) {
      declaration += ', '
      type += '; '
    }
  }

  return `{ ${declaration} }: { ${type} }`
}
