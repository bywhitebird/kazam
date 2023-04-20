import type { IHandler } from '../transformer-react'
import { upperFirst } from '../utils/upperFirst'

export const handleStateInstruction: IHandler<'stateInstruction'> = async (stateInstruction, { addImport }) => {
  addImport({ namedImports: [{ name: 'useState' }], path: 'react' })

  return `const [${stateInstruction.name}, set${upperFirst(stateInstruction.name)}] = useState${stateInstruction.type ? `<${stateInstruction.type}>` : ''}(${stateInstruction.defaultValue?.expression ?? ''})`
}
