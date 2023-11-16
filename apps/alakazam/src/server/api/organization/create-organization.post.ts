import { createOrganization } from "~/server/handlers/organization/create-organization"
import * as valibot from 'valibot'

const CreateNewOrganizationsSchema = valibot.object({
  organization: valibot.object({
    name: valibot.string(),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await readBody(event)

  const parsedBody = valibot.parse(CreateNewOrganizationsSchema, body)

  return createOrganization({
    organization: { name: parsedBody.organization.name },
    user: { id: session.user.id },
  })
})
