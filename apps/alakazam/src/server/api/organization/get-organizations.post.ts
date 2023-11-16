import { getOrganizations } from "~/server/handlers/organization/get-organizations"

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  return getOrganizations({ userId: session.user.id })
})
