import type { IHandler } from '../transformer-react'

export const handleLifecycleEventInstruction: IHandler<'lifecycleEventInstruction'> = (lifecycleEventInstruction, { addImport, transformExpression }) => {
  addImport({ namedImports: [{ name: 'useEffect' }], path: 'react' })

  const { event, callbackExpression } = lifecycleEventInstruction

  switch (event.$value) {
    case 'mount': {
      return `useEffect(${transformExpression(callbackExpression)}, [])`
    }
  }
}
