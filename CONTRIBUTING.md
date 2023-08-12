# Contributing to Kazam

First of all, thank you for your interest in contributing to Kazam! Here are some guidelines to help you get started.

## Getting started

This repository is a monorepo managed with [Turborepo](https://turbo.build/repo/). It uses [`pnpm`](https://pnpm.io/) as package manager.

### Installing `pnpm`

Before you start, you need to install `pnpm`:

```bash
npm install -g pnpm
```

Alternatively, you can use `ni` (developed by [Anthony Fu](https://github.com/antfu)). Please refer to the [documentation](https://github.com/antfu/ni) on how to install it.

### Installing dependencies

To install the dependencies, run:

```bash
pnpm install
```

### Commands

There are several commands available, you can find them in the [`package.json`](package.json) file. Here are the most important ones:

| Command | Description |
| --- | --- |
| `pnpm build` | Build the project |
| `pnpm dev` | Start the development server |
| `pnpm lint` | Lint the code |
| `pnpm lint:fix` | Lint the code and fix the issues |
| `pnpm test` | Run the tests |

There are also some commands that are only available in some packages. Check the `package.json` file of the package you are working on to see them.

## Development

### Committing

When you commit, several hooks are executed:
 - to lint the code
 - to test the code
 - to build the code
 - to ensure that the commit message follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification

To prevent the hooks from rejecting your commit, we recommend running the tests regularly. We also recommend to have the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension installed in VSCode to lint the code (it is installed by default if you use the recommended extensions, see [above](#development-environment)).

> **Warning**
> Never skip the hooks. If you really need to, you can use `git commit --no-verify`, but please don't do it, your pull request will be rejected anyway.

### Environment

We recommend that you use [VSCode](https://code.visualstudio.com/) as your IDE. If you are using it, you can install the recommended extensions. When you open the project, you will be prompted to install the recommended extensions.

### What to work on

You can find some issues in the [issues](https://github.com/bywhitebird/kazam/issues?q=is%3Aopen+is%3Aissue) tab. If you want to work on one of them, please comment on it to let us know. If you want to work on something else, please create an issue first to discuss it.

### Branches

Once you have found something to work on, you can create a branch by using the ["Create a branch" button in the issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-a-branch-for-an-issue). Leave the default values.

### Pull Requests

When you are done, you can create a pull request. We will review it and give you feedback. If you need to make changes, you can push them to the same branch. Once the pull request has been approved, we will merge it.

## Releasing

> **Note**
> You may not need to release anything. Most of the time the maintainers will take care of that.

We use [`changesets`](https://github.com/changesets/changesets/) to manage the releases. All you need to do is to run `pnpm changeset` and follow the instructions. It will version the packages you have selected. When you are done, you can create a pull request. We will review it and merge it. Once it is merged, the release will be published automatically.
