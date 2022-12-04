import type { Watcher } from '@whitebird/kazam-transformer-base'

import type { IHandler } from '../transformer-react'

export const handleWatcher: IHandler<typeof Watcher> = async (watcher, { addImport, component }) => {
  addImport(component.name, {
    namedImports: [{ name: 'useEffect' }],
    path: 'react',
  })

  return `useEffect(() => {${watcher.callbackExpression}}, [${watcher.stateName}])`
}
