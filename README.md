# @rewl/rainbow

True Color display in terminal with no fallback.

## Features

- No dependencies.
- Carefully chosen fancy colors.
- Type linting.
- Well tested. *(probably)*
- Full in-file API documents with JSDoc.

## Caveats

- No detection on color support of console and no fallback.
- Performance is not optimized. If you care about it, consider using more lightweight library like [kleur](https://github.com/lukeed/kleur).
- Although `Node.js`-related module is not used, this library is mostly meant for terminal and does not test against consoles in web browsers.

## Showcase

<div align='center'>
  <img src='./docs/show.png' width=600>
</div>

This result is generated by [`show.js`](./show.js) file.

## Usage

```js
import r = require('@rewl/rainbow')

console.log(r.blue('Blue text'))

console.log(r.orange().bg.dark.blue('Orange text with dark blue background'))

console.log(r.u().rainbow('Rainbow text with underline color'))
```

### Chainable Methods

**Styles**, **colors** and **modifiers** are chainable.

Among these options, **styles** and **colors** are functions and should always be called, whereas **modifiers** are getters.

#### Styles

Those styles are supported:

```
bold (b), italic (i), underline (u), strikethrough (s)

dim, blink, inverse, hidden, reset
```

Calling those methods with no arguments returns the options chain, and calling them with the string would finish the chaining and return the rendered content.

```js
// Render content with current options chaining.
console.log(r.b('Bold text'))

// Continue options chaining.
console.log(r.b().red('Red bold text'))
```

Styles can be nesting.

```js
// The word 'italic' would be both underlined and italic.
console.log(r.u(`underlined ${r.i('italic')} text`))
```

Notably, `reset` would only reset the color inside it.

```js
console.log(r.red(`Red text but ${r.reset('these texts are reset')} and these are not.`))
```

#### Colors

As shown in showcase, these colors are presetted in this library: