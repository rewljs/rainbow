import Context from './context'
import type { CreatedMethods } from './context'
import render, { segmentStyles, expandStyle } from './render'
import Colors, { presetColors } from './colors'

import rainbow from './methods/rainbow'

const Rainbow: Record<string, unknown> = {
  rainbow: rainbow,
}

segmentStyles.forEach(style => {
  Rainbow[style] = (content?: string) => {
    const expanded = expandStyle(style)

    if (content) return render({ content, [expanded]: true })
    return new Context({ [expanded]: true })
  }
})

presetColors.forEach(color => {
  Rainbow[color] = (content?: string) => {
    if (content) return render({ content, color: Colors[color] })
    return new Context({ color: Colors[color] })
  }
})

interface Rainbow extends CreatedMethods {
  rainbow: typeof rainbow
}

export default Rainbow as unknown as Rainbow
export { presetColors }