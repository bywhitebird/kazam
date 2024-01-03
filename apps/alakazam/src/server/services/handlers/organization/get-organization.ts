import { dbFindOrganizationById } from "../../database/organizations/find-organizations";

export const getOrganization = async (organizationId: string, userId: string) => {
  return await dbFindOrganizationById(organizationId, {
    options: {
      auth: { userId: userId },
    },
  });
}
