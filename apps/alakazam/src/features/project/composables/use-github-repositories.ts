export const useGitHubRepositories = () => {
  const {
    data: repositories,
    execute: refreshRepositories,
    pending: fetchingRepositories,
    error: fetchRepositoriesError,
  } = useFetch('/api/get-user-repositories', {
    method: 'POST',
    lazy: true,
  })

  return {
    repositories,
    refreshRepositories,
    fetchingRepositories,
    fetchRepositoriesError,
  }
}
