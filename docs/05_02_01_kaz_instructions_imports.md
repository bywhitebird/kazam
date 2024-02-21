---
draft: true
title: Imports
slug: kaz/instructions/imports
---

# Imports

As in JavaScript, the `import` instruction is used to import modules. All valid JavaScript import syntaxes are supported: default imports, named imports, imports with alias, namespace imports, and side effect imports.

## Examples

### Default import

```kaz
- import _ from 'lodash'
```

### Named import

```kaz
- import { ofetch } from 'ofetch'
```

### Import with alias

```kaz
- import * as utils from './utils'
```

### Namespace import

```kaz
- import 'tailwindcss/tailwind.css'
```
