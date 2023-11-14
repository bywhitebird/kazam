import { getAllOrganizations } from "~/server/handlers/organization/get-all-organizations"

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  return getAllOrganizations({ userId: session.user.id })
})
