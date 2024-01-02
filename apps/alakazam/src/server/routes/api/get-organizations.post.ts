import { getUserOrganizations } from "~/server/services/handlers/organization/get-user-organizations"

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  return getUserOrganizations(session.user.id)
})
