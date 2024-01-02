import * as valibot from "valibot"

import { getProject } from "~/server/services/handlers/project/get-project"

const GetProjectSchema = valibot.object({
  project: valibot.object({
    id: valibot.string(),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await parseBody(event, GetProjectSchema)

  return await getProject({
    projectId: body.project.id,
    userId: session.user.id,
  })
})
