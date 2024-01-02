import { dbFindUserOrganizations } from "../../database/organizations/find-organizations";

export const getUserOrganizations = async (userId: string) => {
  return await dbFindUserOrganizations({
    options: {
      auth: { userId: userId },
    },
  });
}
