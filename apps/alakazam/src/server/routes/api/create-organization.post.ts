import { createOrganization } from "~/server/services/handlers/organization/create-organization"
import * as valibot from 'valibot'

const CreateNewOrganizationsSchema = valibot.object({
  organization: valibot.object({
    name: valibot.string(),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await parseBody(event, CreateNewOrganizationsSchema)

  return createOrganization({
    name: body.organization.name,
    ownerId: session.user.id,
  })
})
