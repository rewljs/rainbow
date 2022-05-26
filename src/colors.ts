import type { ColorMethod } from './impl/palette'
import type { ContextChain } from './context'

import defaultColors from './colors/default'

interface ColorMethods extends
  Record<ColorMethod<typeof defaultColors.names>, ContextChain> {
}

const Colors = {
  default: defaultColors.export(),
}

namespace ColorNames {
  export type Default = keyof typeof Colors.default
}

const ColorList = {
  default: Object.keys(Colors) as ColorNames.Default[],
}

export default Colors
export { ColorList }
export type { ColorMethods, ColorNames }