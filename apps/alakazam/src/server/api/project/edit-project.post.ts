import * as valibot from "valibot"
import { editProject } from "~/server/handlers/project/edit-project"

const EditProjectSchema = valibot.object({
  projectId: valibot.string(),
  name: valibot.string(),
  repositoryUrl: valibot.string(),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await readBody(event)

  const parsedBody = valibot.parse(EditProjectSchema, body)

  return await editProject({
    userId: session.user.id,
    projectId: parsedBody.projectId,
    projectName: parsedBody.name,
    repositoryUrl: parsedBody.repositoryUrl,
  })
})
