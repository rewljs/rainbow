import Palette from '../impl/palette'

const defaultColors = [
  'black',
  'gray',
  'grey',
  'white',
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
] as const

const palette = new Palette(defaultColors)
  .define('black', 0, 0, 0)
  .define('gray', 0, 0, 50)
  .define('grey', 0, 0, 50)
  .define('white', 0, 0, 100)
  .define('red', 8, 70, 95)
  .define('orange', 25, 80, 95)
  .define('honey', 36, 80, 95)
  .define('yellow', 48, 80, 95)
  .define('lemon', 60, 80, 90)
  .define('olive', 78, 70, 95)
  .define('green', 115, 70, 90)
  .define('mint', 156, 75, 95)
  .define('cyan', 185, 80, 95)
  .define('sky', 202, 90, 95)
  .define('blue', 230, 70, 100)
  .define('purple', 265, 60, 100)
  .define('violet', 280, 60, 95)
  .define('magenta', 300, 50, 95)
  .define('pink', 315, 45, 95)

export default palette