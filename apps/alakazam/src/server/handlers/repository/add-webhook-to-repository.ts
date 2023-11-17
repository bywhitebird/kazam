import { Octokit } from "@octokit/rest";

export const addWebhookToRepository = async (
  githubAccessToken: string,
  options: {
    repository: (
      |{
        owner: string
        name: string
      }
      |{
        url: string
      }
    ),
    webhook: {
      url: string
      secret: string
      events: string[],
      comment?: string
    }
  }
) => {
  const octokit = new Octokit({
    auth: githubAccessToken,
  })

  if ('url' in options.repository) {
    const { owner, name } = /^https:\/\/github.com\/(?<owner>[\w-]+)\/(?<name>[\w-]+)$/.exec(options.repository.url)?.groups ?? {}

    if (owner === undefined || name === undefined) {
      throw new Error('Invalid repository URL')
    }

    options.repository = {
      owner,
      name,
    }
  }

  const repo = await octokit.repos.get({
    owner: options.repository.owner,
    repo: options.repository.name,
  })

  if (repo.data.permissions === undefined || repo.data.permissions.admin !== true) {
    throw new Error('User does not have admin permissions on this repository')
  }

  const webhookUrlQuery = options.webhook.events.reduce<URLSearchParams>(
    (query, event) => {
      query.append('webhook_events', event)
      return query
    },
    new URLSearchParams({
      ...(options.webhook.comment ?
        { webhook_events: options.webhook.comment } :
        {})
    })
  )

  const webhookUrl = new URL(options.webhook.url)
  webhookUrl.search = webhookUrlQuery.toString()

  octokit.repos.createWebhook({
    owner: options.repository.owner,
    repo: options.repository.name,
    name: 'web',
    active: true,
    events: options.webhook.events,
    config: {
      url: webhookUrl.toString(),
      content_type: 'json',
      secret: options.webhook.secret,
      insecure_ssl: process.env.NODE_ENV === 'development' ? Number(true) : Number(false),
    },
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
  })
}
