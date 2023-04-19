# kaz-file-parser

> ⚠️ The `.kaz` file format is still in development and is subject to change. Also, the `kaz-file-parser` package is not yet stable and may have implementation errors.

## Overview of `.kaz` file format

The `.kaz` file format is a syntax specifically designed for building UI components. Its syntax tries to be as close to TypeScript as possible.

```kaz
- import _ from "lodash"
- prop buttonText: string = "Button"
- prop callback: () => void = () => console.log('Button clicked')

div() {
    button(
        type="submit",
        onClick={callback}
    ) {
        ${buttonText}
    }
}
```

## Syntax

### Instructions

Instructions start with a dash (`-`) and are followed by a space. They are used to define variables, functions, etc.

#### `import`

Imports a module.

**Default import**

```kaz
- import _ from "lodash"
```

**Named import**

```kaz
- import { map } from "lodash"
```

**Import with alias**

```kaz
- import { map as mapValues } from "lodash"
```

**Namespace import**

```kaz
- import * as _ from "lodash"
```

**Side effect import**

```kaz
- import "./styles.css"
```

#### `prop`

Defines a prop.

```kaz
- prop buttonText: string = "Button"
```

Type and default value are optional.

```kaz
- prop buttonText = "Button"
```

```kaz
- prop buttonText: string
```

```kaz
- prop buttonText
```

#### `state`

Defines a state.

```kaz
- state count: number = 0
```

Type and default values are optional.

```kaz
- state count = 0
```

```kaz
- state count: number
```

```kaz
- state count
```

#### `computed`

Defines a computed property.

```kaz
- state count: number = 0
- computed doubleCount: number = count * 2
```

Type is optional.

```kaz
- state count: number = 0
- computed doubleCount = count * 2
```

#### `watch`

Defines a watcher.

```kaz
- state count: number = 0
- watch (count) {
    console.log('count changed')
  }
```

#### `on`

Defines an event listener.

```kaz
- on:click {
    console.log('clicked')
  }
```

### Template

#### Tags

Tags are defined by their name followed by a pair of parentheses. The parentheses can be empty or contain a list of attributes.

```kaz
div()
```

```kaz
div(
    id="my-div",
    class="my-class"
)
```

An attribute can either be a string or a valid JavaScript expression.

```kaz
div(
    id="my-div",
    onClick={callback}
)
```

A tag can also contain a list of children.

```kaz
div() {
    span() {
        "Hello world"
    }
}
```

#### Text

Any character that is not followed by a pair of parentheses is considered text.

```kaz
div() {
    Hello world
}
```

#### Expressions

JavaScript expressions can be inserted into the template by wrapping them in a pair of curly braces preceded by a dollar sign.

```kaz
div() {
    ${buttonText}
}
```

#### Loops

The `@for` directive is used to iterate over an array.

```kaz
- state items = ['Item 1', 'Item 2', 'Item 3']

ul() {
    @for (let item of items) {
        li() {
            ${item}
        }
    }
}
```

Any `for` parameter valid in JavaScript is valid in `.kaz` files.

```kaz
- state items = ['Item 1', 'Item 2', 'Item 3']

ul() {
    @for (let i = 0; i < items.length; i++) {
        li() {
            ${items[i]}
        }
    }
}
```

```kaz
- state items = ['Item 1', 'Item 2', 'Item 3']

ul() {
    @for (let i in items) {
        li() {
            ${items[i]}
        }
    }
}
```

#### Conditionals

The `@if` directive is used to conditionally render a template.

```kaz
- state show = true

@if (show) {
    div() {
        "Hello world"
    }
}
```

The `@else if` and `@else` directives can be used to add more conditions.

```kaz
- state show = true
- state count = 0

@if (show) {
    div() {
        "Hello world"
    }
} @else if (count > 0) {
    div() {
        "Count is greater than 0"
    }
} @else {
    div() {
        "Count is 0"
    }
}
```

## License

MIT
