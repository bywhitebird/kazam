import * as valibot from "valibot"

import { editOrganization } from "~/server/handlers/organization/edit-organization"

const EditOrganizationSchema = valibot.object({
  organization: valibot.object({
    id: valibot.string(),
    name: valibot.optional(valibot.string()),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await readBody(event)

  const parsedBody = valibot.parse(EditOrganizationSchema, body)

  return await editOrganization({
    organizationId: parsedBody.organization.id,
    organizationName: parsedBody.organization.name,
    userId: session.user.id
  })
})
