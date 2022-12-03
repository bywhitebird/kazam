import { Component, type IComponent } from './schemas'

export type ITransformerInput = IComponent[]

export const validateTransformerInput = (input: unknown): ITransformerInput => Component.array().parse(input)

export * from './schemas'
