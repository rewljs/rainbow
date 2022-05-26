import Palette from '../impl/palette'

const defaultColors = [
  'v0',
  'v10',
  'v20',
  'v30',
  'v40',
  'v50',
  'v60',
  'v70',
  'v80',
  'v90',
  'v100',
] as const

const palette = new Palette(defaultColors)
  .define('v0', 0, 0, 0)
  .define('v10', 0, 0, 10)
  .define('v20', 0, 0, 20)
  .define('v30', 0, 0, 30)
  .define('v40', 0, 0, 40)
  .define('v50', 0, 0, 50)
  .define('v60', 0, 0, 60)
  .define('v70', 0, 0, 70)
  .define('v80', 0, 0, 80)
  .define('v90', 0, 0, 90)
  .define('v100', 0, 0, 100)

export default palette