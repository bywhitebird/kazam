import * as valibot from "valibot"
import { editProject } from "~/server/handlers/project/edit-project"

const EditProjectSchema = valibot.object({
  project: valibot.object({
    id: valibot.string(),
    name: valibot.optional(valibot.string()),
    repository: valibot.optional(valibot.object({
      url: valibot.string(),
      rootDir: valibot.optional(valibot.string()),
    })),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const configuration = useRuntimeConfig()

  const body = await readBody(event)

  const parsedBody = valibot.parse(EditProjectSchema, body)

  const url = new URL(
    configuration.github.webhookUrl !== undefined && configuration.github.webhookUrl !== ''
      ? configuration.github.webhookUrl
      : configuration.ngrok.url
  )
  const webhookUrl = `${url.origin}/api/handle-github-webhook`

  let editProjectParameters: Parameters<typeof editProject>[0] = {
    user: { id: session.user.id },
    project: {
      id: parsedBody.project.id,
      name: parsedBody.project.name,
    },
  }

  if (parsedBody.project.repository?.url) {
    editProjectParameters = {
      ...editProjectParameters,
      repository: {
        ...parsedBody.project.repository,
        url: parsedBody.project.repository.url,
      },
      webhook: {
        url: webhookUrl,
        secret: configuration.github.webhookSecret,
        events: ['push'],
      },
      githubAccessToken: session.user.token,
    }
  }

  return await editProject(editProjectParameters)
})
