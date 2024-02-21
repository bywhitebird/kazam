---
draft: true
title: Computeds
slug: kaz/instructions/computeds
---

# Computeds

The `computed` instruction is used to compute a value from the component's data. They need to have an expression that returns the computed value. They can have types.

## Examples

### Computed

```kaz
- state name
- state lastName
- computed fullName = `${name} ${lastName}`
```

### Computed with a string type

```kaz
- state name
- state lastName
- computed fullName: string = `${name} ${lastName}`
```
