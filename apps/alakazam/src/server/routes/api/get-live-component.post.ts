import * as valibot from "valibot"

import { getLiveComponent } from "~/server/services/handlers/live-components/get-live-component"

const GetLiveComponentSchema = valibot.object({
  componentKey: valibot.string(),
  propsAccessor: valibot.string(),
  selector: valibot.string(),
})

export default defineEventHandler(async (event) => {
  const body = await parseBody(event, GetLiveComponentSchema)

  setResponseHeaders(event, { 'content-type': 'application/javascript' })
  return await getLiveComponent({
    componentKey: body.componentKey,
    propsAccessor: body.propsAccessor,
    selector: body.selector,
  })
})
