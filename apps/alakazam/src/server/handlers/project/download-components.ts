import jszip from 'jszip'

export const downloadComponents = async (
  { userId, projectId }:
  { userId: string, projectId: string },
) => {
  const project = await database.select(
    database.Project,
    (databaseProject) => ({
      filter_single: database.op(databaseProject.id, '=', database.uuid(projectId)),
      organization: () => ({
        members: (member) => ({
          filter: database.op(member.user.id, '=', database.uuid(userId)),
        }),
      }),
      generatedComponents: {
        path: true,
        content: true,
      },
    }),
  ).run(database.client)

  const zip = new jszip()
  project?.generatedComponents.forEach((component) => {
    zip.file(component.path, component.content)
  })

  const zipFile = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 9,
    },
  })

  return zipFile
}
