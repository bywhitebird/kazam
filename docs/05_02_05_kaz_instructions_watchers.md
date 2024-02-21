---
draft: true
title: Watchers
slug: kaz/instructions/watchers
---

# Watchers

The `watch` instruction is used to watch for changes in a component's data. They need to have a function that will be called when the data changes. The data listened needs to be specified in the parameters of the function.

## Examples

### Watcher

```kaz
- state name
- state age
- watch (name, age) => {
    console.log(name, age)
  }
```
