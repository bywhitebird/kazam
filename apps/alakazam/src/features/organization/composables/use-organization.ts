export function useOrganization({ id: organizationId }: { id: string }) {
  const {
    data: organization,
    refresh: refreshOrganization,
    pending: fetchingOrganization,
    error: fetchOrganizationError,
  } = useFetch('/api/get-organization', {
    method: 'POST',
    body: {
      organization: { id: organizationId },
    },
  })

  async function createProject(data: {
    name: string
  } = { name: 'My project' }) {
    await useFetch('/api/create-project', {
      method: 'POST',
      body: {
        organization: {
          id: organizationId,
        },
        project: {
          name: data.name,
        },
      },
    })
    await refreshOrganization()
  }

  async function saveOrganization(data: {
    name?: string
  }) {
    await useFetch('/api/edit-organization', {
      method: 'POST',
      body: {
        organization: {
          id: organizationId,
          name: data.name,
        },
      },
    })
    await refreshOrganization()
  }

  async function openProject(project: { id: string }) {
    await navigateTo(`/projects/${project.id}`)
  }

  return {
    organization,
    refreshOrganization,
    fetchingOrganization,
    fetchOrganizationError,
    createProject,
    saveOrganization,
    openProject,
  }
}
