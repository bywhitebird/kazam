---
draft: true
title: Conditionals
slug: kaz/templating/conditionals
---

# Conditionals

You can use the `@if` directive to conditionally render something. Any `if` parameters valid in JavaScript are supported.

## Examples

### `if` statement

```kaz
@if (condition) {
  p() {
    "This will be rendered if the condition is true"
  }
}
```

### `if-else` statement

```kaz
@if (condition) {
  p() {
    "This will be rendered if the condition is true"
  }
} @else {
  p() {
    "This will be rendered if the condition is false"
  }
}
```

### `if-else-if` statement

```kaz
@if (condition1) {
  p() {
    "This will be rendered if condition1 is true"
  }
} @else if (condition2) {
  p() {
    "This will be rendered if condition2 is true"
  }
} @else {
  p() {
    "This will be rendered if all conditions are false"
  }
}
```
