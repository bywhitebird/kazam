import type { TransformerBase } from "@whitebird/kazam-transformer-base"
import { TransformerReact } from "@whitebird/kazam-transformer-react"
import { TransformerVue } from "@whitebird/kazam-transformer-vue"

const availableTransformerNames = db.transformations.TransformerName.__values__
const transformers = {
  react: TransformerReact,
  vue: TransformerVue,
} satisfies Record<typeof availableTransformerNames[number], typeof TransformerBase<any, any>>

export const findTransformersByNames = (names: (keyof typeof transformers)[]) => {
  return names.map(name => transformers[name])
}

export const findNameByTransformer = (transformer: typeof transformers[keyof typeof transformers]) => {
  for (const transformerName of availableTransformerNames) {
    if (transformers[transformerName] === transformer) {
      return transformerName
    }
  }
}
