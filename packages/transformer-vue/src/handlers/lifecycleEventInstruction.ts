import type { IHandler } from '../transformer-vue'
import { transformVueExpression } from '../utils/transform-vue-expression'

export const handleLifecycleEventInstruction: IHandler<'lifecycleEventInstruction'> = (lifecycleEvent, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'onMounted' },
    ],
    path: 'vue',
  })

  return `onMounted(${transformVueExpression(lifecycleEvent.callbackExpression.$value)})`
}
