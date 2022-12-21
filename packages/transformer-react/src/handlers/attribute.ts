import type { Attribute } from '@whitebird/kazam-transformer-base'

import type { IHandler } from '../transformer-react'

export const handleAttribute: IHandler<typeof Attribute> = async (attribute, { handle, component }) => {
  return `${attribute.name}={${await handle(attribute.valueExpression, component)}}`
}
