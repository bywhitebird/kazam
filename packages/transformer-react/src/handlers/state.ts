import type { State } from '@whitebird/kazam-transformer-base'
import _ from 'lodash'

import type { IHandler } from '../transformer-react'

export const handleState: IHandler<typeof State> = async (state, { addImport, component }) => {
  addImport(component.name, {
    namedImports: [{ name: 'useState' }],
    path: 'react',
  })

  return `const [${state.name}, set${_.upperFirst(state.name)}] = useState${state.type ? `<${state.type}>` : ''}(${state.initialValueExpression})`
}
