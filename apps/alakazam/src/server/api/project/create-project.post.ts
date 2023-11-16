import * as valibot from "valibot"
import { createProject } from "~/server/handlers/project/create-project"

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
  const body = await readBody(event)

  const parsedBody = valibot.parse(CreateProjectSchema, body)

  return await createProject({
    organization: { id: parsedBody.organization.id },
    project: { name: parsedBody.project.name },
    user: { id: session.user.id },
  })
})
