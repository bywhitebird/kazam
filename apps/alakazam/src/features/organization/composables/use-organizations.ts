export function useOrganizations() {
  const {
    data: organizations,
    refresh: refreshOrganizations,
    pending: fetchingOrganizations,
    error: fetchOrganizationsError,
  } = useFetch('/api/get-organizations', {
    method: 'POST',
  })

  const createOrganization = async (data: {
    name: string
  } = { name: 'My organization' }) => {
    await useFetch('/api/create-organization', {
      method: 'POST',
      body: {
        organization: {
          name: data.name
        },
      },
    })
    await refreshOrganizations()
  }

  const openOrganization = async (organization: { id: string }) => {
    await navigateTo(`/organizations/${organization.id}`)
  }

  return {
    organizations,
    refreshOrganizations,
    fetchingOrganizations,
    fetchOrganizationsError,
    createOrganization,
    openOrganization,
  }
}
