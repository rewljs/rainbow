import Palette from '../impl/palette'
import { defaultColors } from './default'

const palette = new Palette(defaultColors)
  .define('red', 8, 40, 95)
  .define('orange', 25, 50, 95)
  .define('honey', 36, 50, 95)
  .define('yellow', 48, 50, 95)
  .define('lemon', 60, 50, 90)
  .define('olive', 78, 40, 95)
  .define('green', 115, 40, 90)
  .define('mint', 156, 45, 95)
  .define('cyan', 185, 50, 95)
  .define('sky', 202, 60, 95)
  .define('blue', 230, 40, 100)
  .define('purple', 265, 30, 100)
  .define('violet', 280, 30, 95)
  .define('magenta', 300, 20, 95)
  .define('pink', 315, 15, 95)
  .define('brown', 25, 50, 70)

export default palette