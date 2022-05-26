import render, { segmentStyles, expandStyle } from './impl/render'
import type { SegmentOptions, SegmentStyles } from './impl/render'
import Colors, { ColorList } from './colors'
import type { ColorMethods, ColorSet, AllColorNames, AllColors } from './colors'

import hsv2rgb from './impl/hsv2rgb'
import rainbow from './methods/rainbow'
import type { RainbowOptions } from './methods/rainbow'

interface ContextChain {
  /**
   * Construct options chain.
   *
   * @param content Content to be rendered
   * @returns rendered content
   */
  (content: string): string
  /**
   * Construct options chain.
   *
   * @returns Options chain
   */
  (): Context
}

interface StyleMethods extends
  Record<SegmentStyles, ContextChain> {
}

interface GeneratedMethods extends StyleMethods, ColorMethods {
}

interface Context extends GeneratedMethods {
  /**
   * Render text using current options chain.
   *
   * @param content Content to be rendered
   * @returns rendered content
   */
  (content: string): string
}

interface ContextModifier {
  background: boolean
  colorSet: ColorSet
}

class Context extends Function {
  /**
   * Rendering options, including styles and colors.
   */
  options: SegmentOptions

  private mods: ContextModifier = {
    background: false,
    colorSet: 'default',
  }

  constructor() {
    super()

    this.options = {}

    segmentStyles.forEach(style => {
      this.createStyleMethod(style)
    })

    ColorList.forEach(color => {
      this.createColorMethod(color as AllColorNames)
    })

    return new Proxy(this, {
      apply: (target, _, args: [string]) => target.render(...args),
    })
  }

  /**
   * Style content using current style chaining.
   *
   * @param content Content to be styled
   * @returns Styled content
   */
  render(content: string): string {
    return render({ ...this.options, content })
  }

  private createStyleMethod(style: SegmentStyles): void {
    const method = (content?: string) => {
      const expanded = expandStyle(style)
      this.options[expanded] = true

      if (content) return this.render(content)
      return this
    }

    this[style] = method as ContextChain
  }

  private createColorMethod(color: AllColorNames): void {
    const method = (content?: string) => {
      let set = Colors[this.mods.colorSet] as AllColors
      if (!set[color]) set = Colors.default

      if (this.mods.background) this.options.background = set[color]
      else this.options.color = set[color]

      this.mods.background = false
      this.mods.colorSet = 'default'

      if (content) return this.render(content)
      return this
    }

    this[color] = method as ContextChain
  }

  /**
   * Set next color to be dark colors.
   */
  get dark() {
    this.mods.colorSet = 'dark'

    return this
  }

  /**
   * Set next color to be light colors.
   */
  get light() {
    this.mods.colorSet = 'light'

    return this
  }

  /**
   * Set next color to be applied on background.
   */
  get bg() {
    this.mods.background = true

    return this
  }

  /**
   * Define custom color using RGB values.
   *
   * @param r Red (0 - 255)
   * @param g Green (0 - 255)
   * @param b Blue (0 - 255)
   * @returns Options chain
   */
  rgb(r: number, g: number, b: number) {
    this.options.color = [r, g, b]

    return this
  }

  /**
   * Define custom color using HSV (or HSB) values.
   *
   * @param h Hue (0 - 360)
   * @param s Saturation (0 - 100)
   * @param v Value (or Brightness) (0 - 100)
   * @returns
   */
  hsv(h: number, s: number, v: number) {
    this.options.color = hsv2rgb(h, s, v)

    return this
  }

  /**
   * Render rainbow color to content using current style chaining.
   *
   * Can only be the last method in the chain, and overrides the previous
   * chained color.
   *
   * @param content Content to be styled
   * @param options Options for the rainbow color
   * @returns Styled content
   */
  rainbow(content: string, options?: Partial<RainbowOptions>) {
    return rainbow(content, {
      ...options,
      renderOptions: this.options,
    })
  }
}

export default Context
export type { ContextChain, GeneratedMethods }