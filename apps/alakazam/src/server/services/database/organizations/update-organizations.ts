export const dbUpdateOrganization = wrapDatabaseRequest(
  (id: string, update: { name?: string }) =>
    db.update(db.organizations.Organization, (dbOrganization) => ({
      filter: db.op(dbOrganization.id, '=', db.uuid(id)),
      set: {
        name: update.name,
      },
    }))
)
