---
draft: true
title: Loops
slug: kaz/templating/loops
---

# Loops

You can use the `@for` directive to iterate over something. Any `for` parameters valid in JavaScript are supported.

## Examples

### `for` loop

```kaz
ul() {
  @for (let i = 0; i < 10; i++) {
    li() {
      ${i}
    }
  }
}
```

### `for-of` loop

```kaz
ul() {
  @for (const item of items) {
    li() {
      ${item}
    }
  }
}
```

### `for-in` loop

```kaz
ul() {
  @for (const key in object) {
    li() {
      ${key}: ${object[key]}
    }
  }
}
```
