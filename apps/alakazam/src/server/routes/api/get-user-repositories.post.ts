import { listAvailableRepositoriesForAuthenticatedUser } from "~/server/services/external-apis/github/list-repositories"

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  return await listAvailableRepositoriesForAuthenticatedUser(session.user.token)
})
