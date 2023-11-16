import * as valibot from "valibot"
import { editProject } from "~/server/handlers/project/edit-project"

const EditProjectSchema = valibot.object({
  project: valibot.object({
    id: valibot.string(),
    name: valibot.optional(valibot.string()),
    repositoryUrl: valibot.optional(valibot.string()),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await readBody(event)

  const parsedBody = valibot.parse(EditProjectSchema, body)

  return await editProject({
    userId: session.user.id,
    projectId: parsedBody.project.id,
    projectName: parsedBody.project.name,
    repositoryUrl: parsedBody.project.repositoryUrl,
  })
})
