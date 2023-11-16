export const useProject = ({ id: projectId }: { id: string }) => {
  const {
    data: project,
    execute: refreshProject,
    pending: fetchingProject,
    error: fetchProjectError,
  } = useFetch('/api/get-project', {
    method: 'POST',
    body: {
      project: { id: projectId },
    },
  })

  async function saveProject(data: {
    name?: string
    repositoryUrl?: string
  }) {
    await useFetch('/api/edit-project', {
      method: 'POST',
      body: {
        project: {
          id: projectId,
          name: data.name,
          repositoryUrl: data.repositoryUrl,
        },
      },
    })
    await refreshProject()
  }

  return {
    project,
    refreshProject,
    fetchingProject,
    fetchProjectError,
    saveProject,
  }
}
