export const dbFindOrganizationById = wrapDatabaseRequest(
  (id: string) =>
    db.select(db.organizations.Organization, (dbOrganization) => ({
      id: true,
      name: true,
      projects: {
        id: true,
        name: true,
      },
      filter_single: db.op(dbOrganization.id, '=', db.uuid(id)),
    }))
)

export const dbFindUserOrganizations = wrapDatabaseRequest(
  () => 
    db.select(db.organizations.Organization, () => ({
      id: true,
      name: true,
    }))
)
