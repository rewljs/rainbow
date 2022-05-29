import type { ColorMethod } from './impl/palette'
import type { ContextChain } from './context'

import defaultColors from './colors/default'
import darkColors from './colors/dark'
import lightColors from './colors/light'
import bwColors from './colors/bw'
import grayColors from './colors/gray'

interface ColorMethods extends
  Record<ColorMethod<typeof defaultColors.names>, ContextChain>,
  Record<ColorMethod<typeof bwColors.names>, ContextChain>,
  Record<ColorMethod<typeof grayColors.names>, ContextChain> {
}

const Colors = {
  default: {
    ...defaultColors.colors,
    ...bwColors.colors,
    ...grayColors.colors,
  },
  dark: darkColors.colors,
  light: lightColors.colors,
}

type TColor = typeof Colors

type U2I<U> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

type ColorSet = keyof TColor

type AllColors = keyof U2I<TColor[keyof TColor]>

/**
 * List of all available colors.
 */
const ColorList = [...new Set<string>([
  ...defaultColors.names,
  ...bwColors.names,
  ...grayColors.names,
  ...darkColors.names,
  ...lightColors.names,
])] as AllColors[]

type AllColorsObject = Record<AllColors, string>

export default Colors
export { ColorList }
export type { ColorMethods, ColorSet }
export type { AllColorsObject, AllColors }