import { dbUpdateProject } from "../../database/projects/update-project";

export const editProject = async (
  projectId: string,
  update: {
    name?: string
    repositories?: { url: string, rootDir?: string }[]
  },
  userId: string,
) => {
  return await dbUpdateProject(
    projectId,
    update,
    {
      options: {
        auth: { userId: userId },
      },
    },
  );
}

