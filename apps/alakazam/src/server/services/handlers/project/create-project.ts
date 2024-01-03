import { dbCreateProject } from "../../database/projects/create-projects";

export const createProject = async (
  project: {
    organizationId: string
    creatorId: string
    name: string
  },
) => {
  return await dbCreateProject({
    organizationId: project.organizationId,
    name: project.name,
  }, {
    options: {
      auth: { userId: project.creatorId },
    },
  })
}
  