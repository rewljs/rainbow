import hsv2rgb from './hsv2rgb'
import render, { segmentStyles, expandStyle } from './render'
import type { SegmentOptions, SegmentStyles } from './render'
import Colors, { presetColors } from './colors'
import type { PresetColors } from './colors'

interface RenderChain {
  (content: string): string
  (): Context
}

interface Context extends
  Record<SegmentStyles, RenderChain>,
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

  private createStyleMethod(style: SegmentStyles): void {
    this[style] = ((content?: string) => {
      const expanded = expandStyle(style)
      this.options[expanded] = true
      if (content) return this.render(content)
      return this
    }) as RenderChain
  }

  private createColorMethod(color: PresetColors): void {
    this[color] = ((content?: string) => {
      this.options.color = Colors[color]
      if (content) return this.render(content)
      return this
    }) as RenderChain
  }
}

interface RainbowConstructed extends
  Record<SegmentStyles, RenderChain>,
  Record<PresetColors, RenderChain> {}

const Rainbow: Record<string, unknown> = {}

segmentStyles.forEach(style => {
  Rainbow[style] = (content?: string) => {
    const expanded = expandStyle(style)
    const ctx = new Context({ [expanded]: true })
    if (content) return ctx.render(content)
    else return ctx
  }
})

presetColors.forEach(color => {
  Rainbow[color] = (content?: string) => {
    const ctx = new Context({ color: Colors[color] })
    if (content) return ctx.render(content)
    else return ctx
  }
})

export default Rainbow as unknown as RainbowConstructed