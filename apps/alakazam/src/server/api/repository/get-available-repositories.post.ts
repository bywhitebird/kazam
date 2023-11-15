import { getAvailableRepository } from "~/server/handlers/repository/get-available-repositories"

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  return await getAvailableRepository(session.user.token)
})
