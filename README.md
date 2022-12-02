<h1>Whitebird <u>Node.js starter</u></h1>

This is a starter project for Node.js projects. It is built on top of the [Turborepo starter](https://github.com/vercel/turbo/tree/main/examples/with-pnpm).

## What's inside?

It uses [pnpm](https://pnpm.io/) as a package manager.

### Utilities

 - [TypeScript](https://www.typescriptlang.org/) for static type checking configured with [@whitebird/tsconfig](https://github.com/bywhitebird/whitebird/tree/main/packages/tsconfig)
 - [ESLint](https://eslint.org/) for code linting configured with [@whitebird/eslint-config](https://github.com/bywhitebird/whitebird/tree/main/packages/eslint-config)
 - [Husky](https://typicode.github.io/husky/#/) for Git hooks
 - [Commitlint](https://commitlint.js.org/#/) for commit message linting
 - [Changesets](https://github.com/changesets/changesets) and the GitHub Action [changesets/action](https://github.com/changesets/action) for versioning and publishing

## Setup

```bash
git clone --depth=1 https://github.com/bywhitebird/starter-node.git
rm -rf starter-node/.git
cd starter-node
pnpm install
```

## Usage

The `packages/my-package` directory is a sample package/app. You can copy it to `packages` or `apps` directory and start working on it.

### Commands

 - `pnpm build` - build the project
 - `pnpm dev` - run the project in development mode
 - `pnpm lint` - lint the project
 - `pnpm test` - run tests
 - `pnpm format` - format the project

## Useful links

 - [Turborepo documentation](https://turbo.build/repo/docs)
 - [Turborepo starter](https://github.com/vercel/turbo/tree/main/examples/with-pnpm)