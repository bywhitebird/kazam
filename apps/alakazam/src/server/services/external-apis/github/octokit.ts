import { App, Octokit } from 'octokit';

if (!process.env.GITHUB_APP_ID) {
  throw new Error('GITHUB_APP_ID not set')
}

if (!process.env.GITHUB_APP_PRIVATE_KEY) {
  throw new Error('GITHUB_APP_PRIVATE_KEY not set')
}

if (!process.env.GITHUB_APP_CLIENT_ID) {
  throw new Error('GITHUB_APP_CLIENT_ID not set')
}

if (!process.env.GITHUB_APP_CLIENT_SECRET) {
  throw new Error('GITHUB_APP_CLIENT_SECRET not set')
}

const alakazamCloudGithubApp = new App({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
  oauth: {
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
  },
})

export const appOctokit = {
  ...alakazamCloudGithubApp.octokit,
  eachInstallation: alakazamCloudGithubApp.eachInstallation,
  eachRepository: alakazamCloudGithubApp.eachRepository,
  getInstallationOctokit: (...args: Parameters<App['getInstallationOctokit']>) => {
    return alakazamCloudGithubApp.getInstallationOctokit(...args).then(octokit => octokit.rest)
  },
}

export const getOctokit = (token: string) => {
  return new Octokit({
    auth: token,
  }).rest
}
