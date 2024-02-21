---
draft: true
title: Properties
slug: kaz/instructions/properties
---

# Properties

The `prop` instruction is used to define a property. Properties are used to pass data from a parent component to a child component. They can have types and default values.

## Examples

### Property

```kaz
- prop age
```

### Property with a string type

```kaz
- prop name: string
```

### Property with a default value

```kaz
- prop age = 18
```

### Property with a string type and a default value

```kaz
- prop name: string = 'John Doe'
```
