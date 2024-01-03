import * as valibot from "valibot"

import { editOrganization } from "~/server/services/handlers/organization/edit-organization"

const EditOrganizationSchema = valibot.object({
  organization: valibot.object({
    id: valibot.string(),
    name: valibot.optional(valibot.string()),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await parseBody(event, EditOrganizationSchema)

  return await editOrganization(body.organization.id, {
    name: body.organization.name,
  }, session.user.id)
})
