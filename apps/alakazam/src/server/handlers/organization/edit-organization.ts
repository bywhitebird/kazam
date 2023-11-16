import { getOrganization } from "./get-organization"

export const editOrganization = async (
  { userId, organizationId, organizationName }:
  { userId: string, organizationId: string, organizationName?: string },
) => {
  if (await getOrganization({ userId, organizationId }) === null) {
    throw new Error('User is not a member of the organization')
  }

  return database
    .update(
      database.Organization,
      (databaseOrganization) => ({
        filter: database.op(databaseOrganization.id, '=', database.uuid(organizationId)),
        set: {
          ...(organizationName !== undefined ? { name: organizationName } : {}),
        },
      }),
    )
    .run(database.client)
}
