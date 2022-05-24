import hsv2rgb from './hsv2rgb'
import render, { segmentStyles, expandShorthand } from './render'
import type {
  SegmentOptions,
  SegmentStylesWithShorthands,
  SegmentStyles,
} from './render'
import Colors, { presetColors } from './colors'
import type { PresetColors } from './colors'

interface RenderChain {
  (content: string): string
  (): Context
}

interface Context extends
  Record<SegmentStylesWithShorthands, RenderChain>,
  Record<PresetColors, RenderChain> {
  options: SegmentOptions
}

class Context {
  constructor(options?: SegmentOptions) {
    this.options = options ?? {}

    segmentStyles.forEach(style => {
      this.createStyleMethod(style)
    })

    presetColors.forEach(color => {
      this.createColorMethod(color)
    })
  }

  render(content: string): string {
    return render({ ...this.options, content })
  }

  private createStyleMethod(style: SegmentStylesWithShorthands): void {
    this[style] = (content?: string) => {
      const expanded = expandShorthand(style)
      this.options[expanded] = true
      if (content) return this.render(content)
      return this
    }
  }

  private createColorMethod(color: PresetColors): void {
    this[color] = (content?: string) => {
      this.options.color = Colors[color]
      if (content) return this.render(content)
      return this
    }
  }
}

export { Context }