import Palette from '../impl/palette'

const defaultColors = [
  'red',
  'orange',
  'honey',
  'yellow',
  'lemon',
  'olive',
  'green',
  'mint',
  'cyan',
  'sky',
  'blue',
  'purple',
  'violet',
  'magenta',
  'pink',
  'brown',
] as const

const palette = new Palette(defaultColors)
  .define('red', 8, 70, 95)
  .define('orange', 25, 80, 95)
  .define('honey', 36, 80, 95)
  .define('yellow', 48, 80, 95)
  .define('lemon', 60, 80, 90)
  .define('olive', 78, 70, 95)
  .define('green', 115, 70, 90)
  .define('mint', 156, 75, 95)
  .define('cyan', 185, 80, 95)
  .define('sky', 202, 80, 95)
  .define('blue', 230, 70, 100)
  .define('purple', 265, 60, 100)
  .define('violet', 280, 60, 95)
  .define('magenta', 300, 60, 95)
  .define('pink', 322, 55, 95)
  .define('brown', 25, 80, 70)

export default palette
export { defaultColors }