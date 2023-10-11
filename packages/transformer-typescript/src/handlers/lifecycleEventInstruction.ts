import type { IHandler } from '../transformer-typescript'

export const handleLifecycleEventInstruction: IHandler<'lifecycleEventInstruction'> = async (lifecycleEvent, { addGeneratedContent }) => {
  switch (lifecycleEvent.event.$value) {
    case 'mount': {
      addGeneratedContent('(function (onMount: () => void) {})(')
      addGeneratedContent(lifecycleEvent.callbackExpression)
      addGeneratedContent(')')
    }
  }
}
