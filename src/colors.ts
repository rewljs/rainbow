import type { ColorMethod } from './impl/palette'
import type { ContextChain } from './context'

import defaultColors from './colors/default'
import darkColors from './colors/dark'
import lightColors from './colors/light'

interface ColorMethods extends
  Record<ColorMethod<typeof defaultColors.names>, ContextChain> {
}

const Colors = {
  default: defaultColors.colors,
  dark: darkColors.colors,
  light: lightColors.colors,
}

const ColorList = {
  default: defaultColors.names,
  dark: darkColors.names,
  light: lightColors.names,
}

namespace ColorNames {
  export type Default = (typeof defaultColors.names)[number]
  export type Dark = (typeof darkColors.names)[number]
  export type Light = (typeof lightColors.names)[number]
}

type ColorSet = keyof typeof Colors

export default Colors
export { ColorList }
export type { ColorMethods, ColorNames, ColorSet }