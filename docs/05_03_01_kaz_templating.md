---
draft: true
title: Templating
slug: kaz/templating/templating
---

# Templating

Tags are used to define HTML elements. They need to have a name followed by a pair of parentheses.

```kaz
div()
```

Optionally, they can have a pair of curly braces.

```kaz
div() {}
```

## Children

Tags can have one or more children. They need to be written between a pair of curly braces.

```kaz
div() {
  h1()
  br()
}
```

As in HTML, text does not need to be wrapped by special characters. It can be written directly inside the tag.

```kaz
div() {
  h1() {
    Hello, world!
  }
}
```

You can also use a dollar sign (`$`) with a pair of curly braces to insert a variable or an expression.

```kaz
div() {
  h1() {
    Hello, ${name}!
  }
}
```

## Attributes

Tags can have attributes. They are defined by a name and a value. If the value is a string, it can be wrapped in single or double quotes. If the value is a variable or an expression, it should be wrapped in curly braces.

### Examples

#### Attribute with a string value

```kaz
img(src="image.jpg", alt="Image")
```

#### Attribute with a variable value

```kaz
img(src={imageSrc}, alt="Image")
```

#### Attribute with an expression value

```kaz
img(src={`image-${index}.jpg`}, alt="Image")
```

## Events

Tags can have events. They are defined by the `on:` prefix followed by the name of the event and a value that is a function.

### Examples

#### On click event

```kaz
button(on:click={() => console.log('Clicked!')}) {
  Click me!
}
```
