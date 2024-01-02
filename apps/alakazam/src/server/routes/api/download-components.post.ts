import * as valibot from "valibot"

import { downloadComponents } from "~/server/services/handlers/project/download-components"

const DownloadComponentsSchema = valibot.object({
  project: valibot.object({
    id: valibot.string(),
  }),
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await parseBody(event, DownloadComponentsSchema)

  setResponseHeaders(event, {
    "Content-Disposition": `attachment; filename=components.zip`,
    "Content-Type": "application/octet-stream",
  });
  return send(event, await downloadComponents({
    projectId: body.project.id,
    userId: session.user.id,
  }));
})
