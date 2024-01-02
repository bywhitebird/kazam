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
    repository?: {
      url: string
      rootDir?: string
    }
  }) {
    await useFetch('/api/edit-project', {
      method: 'POST',
      body: {
        project: {
          id: projectId,
          name: data.name,
          repositories: data.repository ? [{
            url: data.repository.url,
            rootDir: data.repository.rootDir,
          }] : undefined,
        },
      },
    })
    await refreshProject()
  }

  async function downloadComponents() {
    const { data: componentsZipped } = await useFetch<Blob>('/api/download-components', {
      method: 'POST',
      body: {
        project: { id: projectId },
      },
      responseType: 'blob'
    })

    if (componentsZipped.value === null) {
      throw new Error('Zip file not found')
    }

    const url = window.URL.createObjectURL(componentsZipped.value)
    const link = document.createElement('a')
    link.href = url
    link.download = 'components.zip'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return {
    project,
    refreshProject,
    fetchingProject,
    fetchProjectError,
    saveProject,
    downloadComponents,
  }
}
