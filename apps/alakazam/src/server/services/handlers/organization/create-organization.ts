import { dbCreateOrganization } from "../../database/organizations/create-organizations"

export const createOrganization = async (
  organization: {
    name: string
    ownerId: string
  },
) => {
  return await dbCreateOrganization(
    {
      ownerId: organization.ownerId,
      name: organization.name,
    },
    {
      options: {
        auth: { userId: organization.ownerId },
      },
    },
  )
}
