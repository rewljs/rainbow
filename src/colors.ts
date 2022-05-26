import type { ColorMethod } from './impl/palette'
import type { ContextChain } from './context'

import defaultColors from './colors/default'
import darkColors from './colors/dark'

interface ColorMethods extends
  Record<ColorMethod<typeof defaultColors.names>, ContextChain> {
}

const Colors = {
  default: defaultColors.colors,
  dark: darkColors.colors,
}

namespace ColorNames {
  export type Default = (typeof defaultColors.names)[number]
  export type Dark = (typeof darkColors.names)[number]
}

const ColorList = {
  default: defaultColors.names,
  dark: darkColors.names,
}

export default Colors
export { ColorList }
export type { ColorMethods, ColorNames }