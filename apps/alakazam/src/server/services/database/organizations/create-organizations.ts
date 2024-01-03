export const dbCreateOrganization = wrapDatabaseRequest(
  (organization: { ownerId: string, name: string }) => {
    return db.insert(db.organizations.Organization, {
      name: organization.name,
      users: db.select(db.detached(db.users.User), () => ({
        filter_single: { id: organization.ownerId },
        "@isOwner": db.bool(true),
        "@isAdmin": db.bool(true),
      })),
    })
  }
)
