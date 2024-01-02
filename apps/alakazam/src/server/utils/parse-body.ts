import * as valibot from 'valibot'

type FetchEvent = Parameters<Parameters<typeof defineEventHandler>[0]>[0]

export const parseBody = async <T extends valibot.BaseSchema>(event: FetchEvent, schema: T) => {
  const body = await readBody(event)

  return valibot.parse(schema, body)
}
