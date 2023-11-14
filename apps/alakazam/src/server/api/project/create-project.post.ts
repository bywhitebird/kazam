import * as valibot from "valibot"
import { createNewProject } from "~/server/handlers/project/create-project"

const CreateProjectSchema = valibot.object({
  organizationId: valibot.string(),
  project: valibot.object({
    name: valibot.string(),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await readBody(event)

  const parsedBody = valibot.parse(CreateProjectSchema, body)

  return await createNewProject({
    organization: { id: parsedBody.organizationId },
    project: { name: parsedBody.project.name },
    user: { id: session.user.id },
  })
})
