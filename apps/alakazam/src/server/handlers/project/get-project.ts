export const getProject = (
  { userId, projectId }:
  { userId: string, projectId: string },
) => {
  return database
    .select(
      database.Project,
      (databaseProject) => ({
        id: true,
        name: true,
        organization: () => ({
          members: (member) => ({
            filter: database.op(member.user.id, '=', database.uuid(userId)),
          }),
        }),
        filter_single: database.op(databaseProject.id, '=', database.uuid(projectId)),
      })
    )
    .run(database.client)
}
