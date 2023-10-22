import { registerEventEmitter } from '../lib/typed-event-emitter'

const generateEvents = registerEventEmitter<{
  'file-written': string
}>()

export { generateEvents }
