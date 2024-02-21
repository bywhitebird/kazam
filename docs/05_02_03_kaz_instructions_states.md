---
draft: true
title: States
slug: kaz/instructions/states
---

# States

The `state` instruction is used to define a state. States are used to store data that can be changed by the component. A state is reactive, meaning that when its value changes, the component will reflect that change in the UI. They can have types and default values.

## Examples

### State

```kaz
- state age
```

### State with a string type

```kaz
- state name: string
```

### State with a default value

```kaz
- state age = 18
```

### State with a string type and a default value

```kaz
- state name: string = 'John Doe'
```
