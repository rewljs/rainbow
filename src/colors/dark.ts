import Palette from '../impl/palette'
import { defaultColors } from './default'

const palette = new Palette(defaultColors)
  .define('red', 8, 90, 65)
  .define('orange', 25, 90, 65)
  .define('honey', 36, 90, 65)
  .define('yellow', 48, 90, 65)
  .define('lemon', 60, 90, 60)
  .define('olive', 78, 90, 65)
  .define('green', 115, 90, 60)
  .define('mint', 156, 90, 65)
  .define('cyan', 185, 90, 65)
  .define('sky', 202, 90, 65)
  .define('blue', 230, 90, 70)
  .define('purple', 265, 90, 70)
  .define('violet', 280, 90, 65)
  .define('magenta', 300, 90, 65)
  .define('pink', 315, 90, 65)
  .define('brown', 25, 90, 40)

export default palette