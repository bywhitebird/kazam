import * as valibot from "valibot"
import { createProject } from "~/server/services/handlers/project/create-project"

const CreateProjectSchema = valibot.object({
  organization: valibot.object({
    id: valibot.string(),
  }),
  project: valibot.object({
    name: valibot.string(),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await parseBody(event, CreateProjectSchema)

  return await createProject({
    name: body.project.name,
    organizationId: body.organization.id,
    creatorId: session.user.id,
  })
})
