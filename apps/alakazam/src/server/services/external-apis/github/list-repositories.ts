import { getOctokit } from "./octokit";

export const listAvailableRepositoriesForAuthenticatedUser = async (
  githubAccessToken: string,
) => {
  const octokit = getOctokit(githubAccessToken);

  return octokit.apps.listInstallationsForAuthenticatedUser()
    .then(r => r.data.installations)
    .then(installations =>
      Promise.all(
        installations.map(installation =>
          octokit.apps.listInstallationReposForAuthenticatedUser({
            installation_id: installation.id,
          }),
        ),
      ),
    )
    .then((repoResponses) =>
      repoResponses.map((response) =>
        response.data.repositories.map((repo) => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          private: repo.private,
          url: repo.html_url,
          owner: {
            id: repo.owner.id,
            login: repo.owner.login,
          },
        })),
      ),
    )
    .then((repositories) => repositories.flat());
}
