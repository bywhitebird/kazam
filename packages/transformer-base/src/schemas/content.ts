import { z } from 'zod'

import { Attribute, type IAttribute } from './attribute'
import { Event, type IEvent } from './event'
import { Expression, type IExpression } from './expression'

export const Content: z.ZodType<IContent> = z.lazy(() =>
  z.array(
    z.union([
      z.object({
        text: z.string(),
      }),
      z.object({
        expression: Expression,
      }),
      z
        .union([
          z.object({ component: z.string() }),
          z.object({ tag: z.string() }),
        ])
        .and(
          z.object({
            attributes: Attribute.array().optional(),
            events: Event.array().optional(),
            content: Content.optional(),
          }),
        ),
      z.object({
        loop: z.object({
          iterableExpression: Expression,
          itemIdentifier: z.string(),
          indexIdentifier: z.string().optional(),
          content: Content,
        }),
      }),
      z.object({
        conditional: z.object({
          conditionExpression: Expression,
          trueContent: Content,
          falseContent: Content.optional(),
        }),
      }),
    ]),
  ),
)

export type IContent = (
  | {
    text: string
  }
  | {
    expression: IExpression
  }
  | ((
    | {
      component: string
    }
    | {
      tag: string
    }
  ) & {
    attributes?: IAttribute[] | undefined
    events?: IEvent[] | undefined
    content?: IContent | undefined
  })
  | {
    loop: {
      iterableExpression: IExpression
      itemIdentifier: string
      indexIdentifier?: string | undefined
      content: IContent
    }
  }
  | {
    conditional: {
      conditionExpression: IExpression
      trueContent: IContent
      falseContent?: IContent | undefined
    }
  }
)[]
