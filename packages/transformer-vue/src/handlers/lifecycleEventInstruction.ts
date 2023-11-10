import type { IHandler } from '../transformer-vue'

export const handleLifecycleEventInstruction: IHandler<'lifecycleEventInstruction'> = (lifecycleEvent, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'onMounted' },
    ],
    path: 'vue',
  })

  return `onMounted(() => {${lifecycleEvent.callbackExpression.$value}})`
}
