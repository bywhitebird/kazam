import * as valibot from "valibot"

import { editOrganization } from "~/server/handlers/organization/edit-organization"

const EditOrganizationSchema = valibot.object({
  organizationId: valibot.string(),
  name: valibot.string(),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await readBody(event)

  const parsedBody = valibot.parse(EditOrganizationSchema, body)

  return await editOrganization({
    organizationId: parsedBody.organizationId,
    organizationName: parsedBody.name,
    userId: session.user.id
  })
})
