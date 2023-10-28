import { registerEventEmitter } from '../lib/typed-event-emitter'

const generateEvents = registerEventEmitter<{
  'pending': void
  'success': void
  'error': Error
  'file-written': string
}>()

export { generateEvents }
