import Palette from '../impl/palette'

const blackAndWhite = [
  'black',
  'gray',
  'grey',
  'white',
] as const

const palette = new Palette(blackAndWhite)
  .define('black', 0, 0, 0)
  .define('gray', 0, 0, 50)
  .define('grey', 0, 0, 50)
  .define('white', 0, 0, 100)

export default palette