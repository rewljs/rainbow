import Palette from '../impl/palette'
import { defaultColors } from './default'

const palette = new Palette(defaultColors)
  .define('red', 8, 70, 70)
  .define('orange', 25, 80, 70)
  .define('honey', 36, 80, 70)
  .define('yellow', 48, 80, 70)
  .define('lemon', 60, 80, 65)
  .define('olive', 78, 70, 70)
  .define('green', 115, 70, 65)
  .define('mint', 156, 75, 70)
  .define('cyan', 185, 80, 70)
  .define('sky', 202, 90, 70)
  .define('blue', 230, 70, 75)
  .define('purple', 265, 60, 75)
  .define('violet', 280, 60, 70)
  .define('magenta', 300, 50, 70)
  .define('pink', 315, 45, 70)
  .define('brown', 25, 80, 45)

export default palette