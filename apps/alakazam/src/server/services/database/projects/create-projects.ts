export const dbCreateProject = wrapDatabaseRequest(
  (project: { organizationId: string, name: string }) =>
    db.update(db.organizations.Organization, (dbOrganization) => ({
      filter: db.op(dbOrganization.id, '=', db.uuid(project.organizationId)),
      set: {
        projects: {
          '+=': db.insert(db.projects.Project, {
            name: project.name,
          }),
        },
      },
    }))
)
