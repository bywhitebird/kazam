export const createNewOrganizations = (
  { organization, user }:
    {
      organization: { name: string }
      user: { id: string }
    },
) => {
  return database.insert(
    database.OrganizationMember,
    {
      user: database.select(database.User, (databaseUser) => ({
        filter_single: database.op(databaseUser.id, '=', database.uuid(user.id)),
      })),
      organization: database.insert(database.Organization, {
        name: organization.name,
      }),
      isAdministrator: true,
    },
  ).run(database.client)
}
