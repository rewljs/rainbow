import Context from './context'
import type { OptionsMethods } from './context'
import render, { segmentStyles, expandStyle } from './impl/render'
import Colors, { ColorList } from './colors'

import rainbow from './methods/rainbow'

const Rainbow: Record<string, unknown> = {
  get bg() {
    return new Context().bg
  },

  get dark() {
    return new Context().dark
  },

  get light() {
    return new Context().light
  },

  rgb(r: number, g: number, b: number) {
    return new Context().rgb(r, g, b)
  },

  hsv(h: number, s: number, v: number) {
    return new Context().hsv(h, s, v)
  },

  rainbow: rainbow,
}

segmentStyles.forEach(style => {
  Rainbow[style] = (content?: string) => {
    const expanded = expandStyle(style)

    if (content) return render({ content, [expanded]: true })
    return new Context({ [expanded]: true })
  }
})

ColorList.forEach(color => {
  Rainbow[color] = (content?: string) => {
    if (content) return render({ content, color: Colors.default[color] })
    return new Context({ color: Colors.default[color] })
  }
})

interface Rainbow extends OptionsMethods {
  /**
   * Set next color call to be applied on background.
   */
  get bg(): Context

  /**
   * Set next color call to be dark colors.
   */
  get dark(): Context

  /**
   * Set next color call to be light colors.
   */
  get light(): Context

  /**
   * Define custom color using RGB values.
   *
   * @param r Red (0 - 255)
   * @param g Green (0 - 255)
   * @param b Blue (0 - 255)
   * @returns Options chain
   */
  rgb(r: number, g: number, b: number): Context

  /**
   * Define custom color using HSV (or HSB) values.
   *
   * @param h Hue (0 - 360)
   * @param s Saturation (0 - 100)
   * @param v Value (or Brightness) (0 - 100)
   * @returns Options chain
   */
  hsv(h: number, s: number, v: number): Context

  /**
   * Render rainbow color to content using current style chaining.
   *
   * Can only be the last method in the chain, and overrides the previous
   * chained color.
   *
   * @param content Content to be rebdered
   * @param options Options for the rainbow color
   * @returns Rendered content
   */
  rainbow: typeof rainbow
}

export default Rainbow as unknown as Rainbow
export { ColorList }