export const getAllOrganizations = ({ userId }: { userId: string }) => {
  return database.select(
    database.Organization,
    () => ({
      name: true,
      id: true,
      members: (member) => ({
        filter: database.op(member.user.id, '=', database.uuid(userId)),
      }),
    }),
  ).run(database.client)
}
