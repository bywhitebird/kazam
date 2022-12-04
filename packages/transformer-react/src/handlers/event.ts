import type { Event } from '@whitebird/kazam-transformer-base'
import _ from 'lodash'

import type { IHandler } from '../transformer-react'

export const handleEvent: IHandler<typeof Event> = async (event, { handle, component }) => {
  return `on${_.upperFirst(event.name)}={${await handle(event.callbackExpression, component)}}`
}
