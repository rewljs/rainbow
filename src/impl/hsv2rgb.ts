import type { ColorTuple } from './types'

/**
 * Convert HSV color to RGB color.
 *
 * @param h Hue (0 - 360)
 * @param s Saturation (0 - 100)
 * @param v Value (or Brightness) (0 - 100)
 * @return Red, Green, Blue value as integer (0 - 255)
 */
const hsv2rgb = (h: number, s: number, v: number): ColorTuple => {
  v = v / 100

  if (s === 0) {
    const value = Math.round(v * 255)
    return [value, value, value]
  }

  h = h == 360 ? 0 : h / 60
  s = s / 100

  const c = s * v // Chroma
  const x = c * (1 - Math.abs((h % 2) - 1))
  const m = v - c //

  let rgb = [0, 0, 0]
  switch (Math.floor(h)) {
    case 0:
      rgb = [c, x, 0]
      break
    case 1:
      rgb = [x, c, 0]
      break
    case 2:
      rgb = [0, c, x]
      break
    case 3:
      rgb = [0, x, c]
      break
    case 4:
      rgb = [x, 0, c]
      break
    case 5:
      rgb = [c, 0, x]
      break
  }

  // To be identical with the behavior of Adobe Photoshop
  return rgb.map(value => Math.round((value + m) * 255)) as ColorTuple
}

export default hsv2rgb
