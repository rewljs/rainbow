import hsv2rgb from '../impl/hsv2rgb'
import render from '../impl/render'
import type { SegmentOptions } from '../impl/render'

interface RainbowOptions {
  /**
   * Offset of the starting hue. Default to 0 (starts from red).
   *
   * Would be a random number if set to 'random'.
   *
   * @default 0
   */
  offset: number | 'random'
  /**
   * Whether the direction of the spectrum should be reversed.
   *
   * i.e. red -> orange if not reversed, red -> purple if reversed.
   *
   * @default false
   */
  reverse: boolean
  /**
   * Hue span (in degree). Default to 360 (the whole spectrum).
   *
   * @default 360
   */
  span: number
  /**
   * Saturation.
   *
   * @default 80
   */
  s: number
  /**
   * Value (or Brightness).
   *
   * @default 95
   */
  v: number
  /**
   * Whether the rainbow color should be applied to background or not.
   *
   * @default false
   */
  background: boolean
  /**
   * Styles to be applied.
   *
   * @default {}
   */
  renderOptions?: SegmentOptions
}

/**
 * Apply rainbow color to the content using provided style.
 *
 * @param content Content to be rendered
 * @param options Options for the color method
 * @returns Rendered content
 */
const rainbow = (content: string, options?: Partial<RainbowOptions>): string => {
  const val: RainbowOptions = {
    background: false,
    offset: 0,
    reverse: false,
    span: 360,
    s: 80,
    v: 95,
    renderOptions: {},
    ...options,
  }
  if (val.offset === 'random') val.offset = Math.random() * 360

  const length = content.length
  const i = val.span / length * (val.reverse ? -1 : 1)
  const colorField = val.background ? 'background' : 'color'
  let rendered = ''

  for (let c = 0; c < length; c++) {
    const h = (Math.floor(i * c) + val.offset) % 360
    const rgb = hsv2rgb(h, val.s, val.v)
    rendered += render({
      ...val.renderOptions,
      content: content[c],
      [colorField]: rgb,
    })
  }

  return rendered
}

export default rainbow
export type { RainbowOptions }