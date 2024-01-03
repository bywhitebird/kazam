import * as valibot from "valibot"

import { getOrganization } from "~/server/services/handlers/organization/get-organization"

const GetOrganizationSchema = valibot.object({
  organization: valibot.object({
    id: valibot.string(),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await parseBody(event, GetOrganizationSchema)

  return await getOrganization(body.organization.id, session.user.id)
})
