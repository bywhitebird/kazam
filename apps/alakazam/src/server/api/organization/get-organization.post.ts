import * as valibot from "valibot"

import { getOrganization } from "~/server/handlers/organization/get-organization"

const GetOrganizationSchema = valibot.object({
  organization: valibot.object({
    id: valibot.string(),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await readBody(event)

  const parsedBody = valibot.parse(GetOrganizationSchema, body)

  return await getOrganization({
    organizationId: parsedBody.organization.id,
    userId: session.user.id
  })
})
