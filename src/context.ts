import render, { segmentStyles, expandStyle } from './render'
import type { SegmentOptions, SegmentStyles } from './render'
import Colors, { presetColors } from './colors'
import type { PresetColors } from './colors'

import rainbow from './methods/rainbow'
import type { RainbowOptions } from './methods/rainbow'

interface ContextChain {
  /**
   * Construct style chain.
   *
   * @param content Content to be styled
   * @returns Styled content
   */
  (content: string): string
  /**
   * Construct style chain.
   *
   * @returns Styled chain
   */
  (): Context
}

type CreatedMethods = Record<SegmentStyles, ContextChain> & Record<PresetColors, ContextChain>

interface Context extends CreatedMethods {
  options: SegmentOptions
}

class Context {
  constructor(options?: SegmentOptions) {
    this.options = options || {}

    segmentStyles.forEach(style => {
      this.createStyleMethod(style)
    })

    presetColors.forEach(color => {
      this.createColorMethod(color)
    })
  }

  private createStyleMethod(style: SegmentStyles): void {
    const styleMethod = (content?: string) => {
      const expanded = expandStyle(style)
      this.options[expanded] = true

      if (content) return this.render(content)
      return this
    }

    this[style] = styleMethod as ContextChain
  }

  private createColorMethod(color: PresetColors): void {
    const colorMethod = (content?: string) => {
      this.options.color = Colors[color]

      if (content) return this.render(content)
      return this
    }

    this[color] = colorMethod as ContextChain
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
      styles: this.options,
    })
  }
}

export default Context
export type { ContextChain, CreatedMethods }