import render, { segmentStyles, expandStyle } from './impl/render'
import type { SegmentOptions, SegmentStyles } from './impl/render'
import Colors, { ColorList } from './colors'
import type { ColorMethods, ColorNames } from './colors'

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

enum PaletteSet {
  default,
  light,
  dark,
}

interface ContextModifier {
  background: boolean
  palette: PaletteSet
}

class Context extends Function {
  /**
   * Rendering options, including styles and colors.
   */
  options: SegmentOptions

  private mod: ContextModifier = {
    background: false,
    palette: PaletteSet.default,
  }

  constructor() {
    super()

    this.options = {}

    segmentStyles.forEach(style => {
      this.createStyleMethod(style)
    })

    ColorList.default.forEach(color => {
      this.createColorMethod(color as ColorNames.Default)
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

  private createColorMethod(color: ColorNames.Default): void {
    const method = (content?: string) => {
      switch (this.mod.palette) {
        case PaletteSet.default:
          this.options.color = Colors.default[color]
          break
        case PaletteSet.dark:
          this.options.color = Colors.dark[color]
          this.mod.palette = PaletteSet.default
          break
      }

      if (content) return this.render(content)
      return this
    }

    this[color] = method as ContextChain
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

  /**
   * Set next color call to apply dark color.
   */
  get dark() {
    this.mod.palette = PaletteSet.dark

    return this
  }
}

export default Context
export type { ContextChain, GeneratedMethods }