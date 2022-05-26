import Palette from '../impl/palette'
import { defaultColors } from './default'

const palette = new Palette(defaultColors)
  .define('red', 8, 45, 100)
  .define('orange', 25, 45, 100)
  .define('honey', 36, 45, 100)
  .define('yellow', 48, 40, 100)
  .define('lemon', 60, 40, 100)
  .define('olive', 78, 35, 100)
  .define('green', 115, 35, 100)
  .define('mint', 156, 35, 100)
  .define('cyan', 185, 40, 100)
  .define('sky', 202, 40, 100)
  .define('blue', 230, 35, 100)
  .define('purple', 265, 30, 100)
  .define('violet', 280, 30, 100)
  .define('magenta', 300, 25, 100)
  .define('pink', 322, 30, 100)
  .define('brown', 25, 50, 70)

export default palette