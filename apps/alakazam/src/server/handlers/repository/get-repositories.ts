import { Octokit } from '@octokit/rest';

export const getRepositoriesByToken = async (
  githubAccessToken: string,
) => {
  const octokit = new Octokit({
    auth: githubAccessToken,
  });

  return octokit.repos
    .listForAuthenticatedUser({
      visibility: 'all',
      affiliation: 'owner,organization_member',
      sort: 'updated',
      per_page: 100,
    })
    .then((response) => {
      return response.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        private: repo.private,
        url: repo.html_url,
        owner: {
          id: repo.owner.id,
          login: repo.owner.login,
        },
      }));
    });
}
