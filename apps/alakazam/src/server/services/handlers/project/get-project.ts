import { dbFindProjectById } from "../../database/projects/find-projects";

export const getProject = async (
  { userId, projectId }:
  { userId: string, projectId: string },
) =>
  await dbFindProjectById(projectId, { options: { auth: { userId } } })
