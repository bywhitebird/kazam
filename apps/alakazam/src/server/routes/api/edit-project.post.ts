import * as valibot from "valibot"
import { editProject } from "~/server/services/handlers/project/edit-project"

const EditProjectSchema = valibot.object({
  project: valibot.object({
    id: valibot.string(),
    name: valibot.optional(valibot.string()),
    repositories: valibot.optional(valibot.array(valibot.object({
      url: valibot.string(),
      rootDir: valibot.optional(valibot.string()),
    }))),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const body = await parseBody(event, EditProjectSchema)

  return await editProject(body.project.id, {
    name: body.project.name,
    repositories: body.project.repositories,
  }, session.user.id)
})
