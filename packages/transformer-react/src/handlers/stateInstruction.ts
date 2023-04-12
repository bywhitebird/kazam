import _ from 'lodash'

import type { IHandler } from '../transformer-react'

export const handleStateInstruction: IHandler<'stateInstruction'> = async (stateInstruction, { addImport }) => {
  addImport({ namedImports: [{ name: 'useState' }], path: 'react' })

  return `const [${stateInstruction.name}, set${_.upperFirst(stateInstruction.name)}] = useState${stateInstruction.type ? `<${stateInstruction.type}>` : ''}(${stateInstruction.defaultValue?.expression ?? ''})`
}
