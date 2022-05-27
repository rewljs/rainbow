import render, { segmentStyles, expandStyle } from './impl/render'
import type { SegmentOptions, SegmentStyles } from './impl/render'
import Colors, { ColorList } from './colors'
import type { ColorMethods, ColorSet, AllColorNames, AllColors } from './colors'

import hsv2rgb from './impl/hsv2rgb'
import rainbow from './methods/rainbow'
import type { RainbowOptions } from './methods/rainbow'
import hash from './methods/hash'
import type { HashOptions } from './methods/hash'

interface ContextChain {
  /**
   * Render content using current options chain.
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

interface StyleMethods extends Record<SegmentStyles, ContextChain> {
}

interface OptionsMethods extends StyleMethods, ColorMethods {
}

interface Context extends OptionsMethods {
  /**
   * Render content using current options chain.
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

const defaultContextModifier: ContextModifier = {
  background: false,
  colorSet: 'default',
}

class Context extends Function {
  /**
   * Rendering options, including styles and colors.
   */
  options: SegmentOptions

  private mods: ContextModifier = { ...defaultContextModifier }

  constructor(options: SegmentOptions = {}) {
    super()

    this.options = options

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
   * Render content using current options chain.
   *
   * @param content Content to be rendered
   * @returns Rendered content
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

      this.mods = { ...defaultContextModifier }

      if (content) return this.render(content)
      return this
    }

    this[color] = method as ContextChain
  }

  /**
   * Set next color call to be applied on background.
   */
  get bg() {
    this.mods.background = true

    return this
  }

  /**
   * Set next color call to be dark colors.
   */
  get dark() {
    this.mods.colorSet = 'dark'

    return this
  }

  /**
   * Set next color call to be light colors.
   */
  get light() {
    this.mods.colorSet = 'light'

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
   * @returns Options chain
   */
  hsv(h: number, s: number, v: number) {
    this.options.color = hsv2rgb(h, s, v)

    return this
  }

  /**
   * Render rainbow color to content using current style chaining.
   *
   * Can only be the last method in the chain, and overrides the previous
   * chained color. `bg` modifier can be chained before this method.
   *
   * @param content Content to be rendered
   * @param options Options for the color method
   * @returns Rendered content
   */
  rainbow(content: string, options?: Partial<RainbowOptions>) {
    return rainbow(content, {
      ...options,
      background: this.mods.background,
      renderOptions: this.options,
    })
  }

  /**
   * Render color according to the provided content.
   *
   * Color would be the same if the content is the same.
   *
   * Can only be the last method in the chain, and overrides the previous
   * chained color. `bg` modifier can be chained before this method.
   *
   * @param content Content to be rendered
   * @param options Options for the color method
   * @returns Rendered content
   */
  hash(content: string, options?: Partial<HashOptions>) {
    return hash(content, {
      ...options,
      background: this.mods.background,
      renderOptions: this.options,
    })
  }
}

export default Context
export type { ContextChain, OptionsMethods }