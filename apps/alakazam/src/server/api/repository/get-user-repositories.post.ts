import { getRepositoriesByToken } from "~/server/handlers/repository/get-repositories"

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  return await getRepositoriesByToken(session.user.token)
})
