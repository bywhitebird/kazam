---
draft: true
title: Getting Started
slug: getting-started/getting-started
---

# Getting Started

## Installation

Kazam is available as a CLI tool. To install it, run the following command:

```bash
npm install -g kazam
```

You can also install it as a dev dependency and run it with `npx` or with a script in your `package.json`:

```bash
npm install --save-dev kazam
```

## Generating components with Kazam

Once you have configured Kazam, and you have valid input sources, you can generate components with the `generate` command.

```bash
kazam generate
```

When you run the `generate` command, Kazam will generate component files based on your input sources and the transformers you have specified in your configuration.

Kazam will create a separate directory for each transformer in the output directory. The directory name will be derived from the name of the transformer class by removing the “Transformer” prefix and converting the remaining part to lowercase. For example, if you have specified `TransformerReact` and `TransformerVue` in your configuration, Kazam will generate the components in the `output/react` and `output/vue` directories respectively.
