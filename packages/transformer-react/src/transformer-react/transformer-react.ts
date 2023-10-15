import { TransformerBase } from '@whitebird/kazam-transformer-base'
import { Effect } from 'effect'

import { transform } from './transform/transform'

export class TransformerReact extends TransformerBase<{
  outputExtension: 'tsx'
}> {
  public transform() {
    return Effect.runSync(transform({
      input: this.input,
      options: this.options,
    }))
  }
}
