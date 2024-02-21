---
draft: true
title: Kaz
slug: kaz/introduction
---

# Kaz

Kaz is a language specifically crafted for UI component development. Drawing inspiration from TypeScript, Pug, and Edge, Kaz's syntax is designed to be both familiar and intuitive. The Kaz language's readability and intuitive design further aid in its ease of use, allowing developers (even those who are new to Kaz) to create UI components with efficiency and ease.

## Syntax and structure

Kaz is composed of two distinct parts:

- *Instructions* define the properties, states, computed properties, and watchers of the component. They start with a dash (`-`).
- *Templates* define its structure and appearance.

To keep things organized, instructions are placed at the top of the file, while templates are placed after them.

## Example

Here's an example that uses all the features of Kaz:

```kaz
- import { capitalize } from 'lodash'

- prop firstName: string
- prop lastName: string = 'Doe'
- computed fullName = `${capitalize(firstName)} ${capitalize(lastName)}`

- prop githubLink: string | undefined

- state oldAge: number = 18
- state age = 18
- watch (age) => {
    console.log(`You were ${oldAge} and now you are ${age}`)
    oldAge = age
  }

div(class="id-card") {
  h1(class="name") {
    ${fullName}
  }
  
  p(class={`age ${age > 18 ? 'age--adult' : 'age--minor'}`) {
    ${age}
    @if (age > 18) {
      'Adult'
    } @else {
      'Minor'
    }
  }

  div(class="candles") {
    @for (let i = 0; i < age; i++) {
      div(class="candle") {
        🎂
      }
    }
  }

  @if (githubLink) {
    a(href={githubLink}, target="_blank") {
      'GitHub'
    }
  }
}
```
