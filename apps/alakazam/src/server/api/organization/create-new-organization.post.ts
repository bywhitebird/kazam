import { createNewOrganizations } from "~/server/handlers/organization/create-new-organization"
import * as valibot from 'valibot'

const CreateNewOrganizationsSchema = valibot.object({
  name: valibot.string(),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await readBody(event)

  const parsedBody = valibot.parse(CreateNewOrganizationsSchema, body)

  return createNewOrganizations({
    organization: { name: parsedBody.name },
    user: { id: session.user.id },
  })
})
