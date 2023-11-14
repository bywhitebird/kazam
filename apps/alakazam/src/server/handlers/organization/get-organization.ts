export const getOrganization = ({ userId, organizationId }: { userId: string, organizationId: string }) => {
  return database
    .select(
      database.Organization,
      (databaseOrganization) => ({
        name: true,
        id: true,
        members: (member) => ({
          filter: database.op(member.user.id, '=', database.uuid(userId)),
        }),
        filter: database.op(databaseOrganization.id, '=', database.uuid(organizationId)),
      }),
    )
    .run(database.client)
    .then((organizations) => organizations[0] ?? null)
}
