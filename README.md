# @rewl/rainbow

True Color display in terminal with no fallback.

## Features

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