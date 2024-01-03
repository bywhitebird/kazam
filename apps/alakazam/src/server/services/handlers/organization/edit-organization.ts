import { dbUpdateOrganization } from "../../database/organizations/update-organizations";

export const editOrganization = async (
  organizationId: string,
  update: { name?: string },
  userId: string,
) => {
  return await dbUpdateOrganization(
    organizationId,
    update,
    {
      options: {
        auth: { userId: userId },
      },
    },
  );
}
