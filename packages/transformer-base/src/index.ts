import { kazAstSchema } from '@whitebird/kaz-ast'
import zod from 'zod'

export const TransformerInput = zod.record(zod.string(), kazAstSchema)

export function validateTransformerInput(input: unknown) {
  return TransformerInput.parse(input)
}

export type ITransformerInput = zod.infer<typeof TransformerInput>

export * from './transformer-base'
