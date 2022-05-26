import Context from './context'
import type { GeneratedMethods } from './context'
import render, { segmentStyles, expandStyle } from './impl/render'
import Colors, { ColorList } from './colors'

import rainbow from './methods/rainbow'

const Rainbow: Record<string, unknown> = {
  rainbow: rainbow,
}

segmentStyles.forEach(style => {
  Rainbow[style] = (content?: string) => {
    const expanded = expandStyle(style)

    if (content) return render({ content, [expanded]: true })
    return new Context()[expanded]()
  }
})

ColorList.forEach(color => {
  Rainbow[color] = (content?: string) => {
    if (content) return render({ content, color: Colors.default[color] })
    return new Context()[color]()
  }
})

interface Rainbow extends GeneratedMethods {
  rainbow: typeof rainbow
}

export default Rainbow as unknown as Rainbow
export { ColorList }