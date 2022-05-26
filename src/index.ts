import Context from './context'
import type { GeneratedMethods } from './context'
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

interface Rainbow extends GeneratedMethods {
  get bg(): Context
  get dark(): Context
  get light(): Context
  rgb(r: number, g: number, b: number): Context
  hsv(h: number, s: number, v: number): Context
  rainbow: typeof rainbow
}

export default Rainbow as unknown as Rainbow
export { ColorList }