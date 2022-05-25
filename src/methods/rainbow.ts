import hsv2rgb from '../hsv2rgb'
import render from '../render'
import type { SegmentOptions } from '../render'

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
   * Whether the direction of spectrum is reversed.
   *
   * i.e. red -> orange if not reversed, red -> purple if reversed.
   *
   * @default false
   */
  reverse: boolean
  /**
   * Hue span. Default to 360 degree.
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
   * Value (or Brightness)
   *
   * @default 95
   */
  v: number
  /**
   * Styles to be applied.
   *
   * @default {}
   */
  renderOptions?: SegmentOptions
}

/**
 * Render rainbow color to the content using provided style.
 *
 * @param content Content to be styled
 * @param options Options for the rainbow color
 * @returns Styled content
 */
const rainbow = (content: string, options?: Partial<RainbowOptions>): string => {
  const val: RainbowOptions = {
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
  let rendered = ''

  for (let c = 0; c < length; c++) {
    const h = (Math.floor(i * c) + val.offset) % 360
    rendered += render({
      ...val.renderOptions,
      content: content[c],
      color: hsv2rgb(h, val.s, val.v),
    })
  }

  return rendered
}

export default rainbow
export type { RainbowOptions }