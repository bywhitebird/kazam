import { getOrganization } from "../organization/get-organization"

export const createNewProject = async (
  { organization, project, user }:
    {
      project: { name: string }
      organization: { id: string }
      user: { id: string }
    },
) => {
  const foundOrganization = await getOrganization({
    organizationId: organization.id,
    userId: user.id,
  })

  if (foundOrganization === null) {
    throw new Error('User is not a member of the organization')
  }

  return database.update(
    database.Organization,
    (databaseOrganization) => ({
      filter: database.op(databaseOrganization.id, '=', database.uuid(foundOrganization.id)),
      set: {
        projects: {
          "+=": database.insert(database.Project, {
            name: project.name,
          })
        },
      }
    }),
  ).run(database.client)
}
