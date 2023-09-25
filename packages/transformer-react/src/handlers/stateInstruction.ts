import type { IHandler } from '../transformer-react'
import { upperFirst } from '../utils/upperFirst'

export const handleStateInstruction: IHandler<'stateInstruction'> = (stateInstruction, { addImport, transformExpression }) => {
  addImport({ namedImports: [{ name: 'useState' }], path: 'react' })

  return `const [${
    stateInstruction.name.$value
  }, set${
    upperFirst(stateInstruction.name.$value)
  }] = useState${
    stateInstruction.type?.$value
      ? `<${stateInstruction.type.$value}>`
      : ''
  }(${
    stateInstruction.defaultValue !== undefined
      ? transformExpression(stateInstruction.defaultValue.expression)
      : ''
  })`
}
