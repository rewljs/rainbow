import render, { segmentStyles, expandStyle } from './render'
import type { SegmentOptions, SegmentStyles } from './render'
import Colors, { presetColors } from './colors'
import type { PresetColors, PresetBackgrounds } from './colors'

import hsv2rgb from './hsv2rgb'
import rainbow from './methods/rainbow'
import type { RainbowOptions } from './methods/rainbow'

const cap = <T extends string>(str: T): Capitalize<T> => {
  return str.charAt(0).toUpperCase() + str.slice(1) as Capitalize<T>
}

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

type CreatedMethods =
  Record<SegmentStyles, ContextChain> &
  Record<PresetColors, ContextChain> &
  Record<PresetBackgrounds, ContextChain>

interface Context extends CreatedMethods {
  /**
   * Rendering options, including styles and colors.
   */
  options: SegmentOptions
  /**
   * Render text using current options chain.
   *
   * @param content Content to be rendered
   * @returns rendered content
   */
  (content: string): string
}

class Context extends Function {
  constructor(options?: SegmentOptions) {
    super()

    this.options = options || {}

    segmentStyles.forEach(style => {
      this.createStyleMethod(style)
    })

    presetColors.forEach(color => {
      this.createColorMethod(color)
      this.createBackgroundMethod(color)
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

  private createColorMethod(color: PresetColors): void {
    const method = (content?: string) => {
      this.options.color = Colors[color]

      if (content) return this.render(content)
      return this
    }

    this[color] = method as ContextChain
  }

  private createBackgroundMethod(color: PresetColors): void {
    const method = (content?: string) => {
      this.options.background = Colors[color]

      if (content) return this.render(content)
      return this
    }

    this[`bg${cap(color)}`] = method as ContextChain
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
  rainbow(content: string, options?: Partial<RainbowOptions>): string {
    return rainbow(content, {
      ...options,
      renderOptions: this.options,
    })
  }
}

export default Context
export type { ContextChain, CreatedMethods }