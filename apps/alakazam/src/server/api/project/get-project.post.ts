import * as valibot from "valibot"

import { getProject } from "~/server/handlers/project/get-project"

const GetProjectSchema = valibot.object({
  projectId: valibot.string(),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await readBody(event)

  const parsedBody = valibot.parse(GetProjectSchema, body)

  return await getProject({
    projectId: parsedBody.projectId,
    userId: session.user.id,
  })
})
