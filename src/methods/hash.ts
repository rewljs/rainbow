import hsv2rgb from '../impl/hsv2rgb'
import render from '../impl/render'
import type { SegmentOptions } from '../impl/render'

interface HashOptions {
  /**
   * Saturation (or its range).
   *
   * Could be a number or an array of `[minValue, maxValue]`
   *
   * @default [80, 100]
   */
  s: number | [number, number]
  /**
   * Value (or Brightness) (or its range).
   *
   * Could be a number or an array of `[minValue, maxValue]`
   *
   * @default [80, 100]
   */
  v: number | [number, number]
  /**
   * Whether the color should be applied to background.
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

const getBase = (n: number | [number, number]): number => {
  return typeof n === 'number' ? n : n[0]
}

const getRange = (n: number | [number, number]): number => {
  return typeof n === 'number' ? 1 : n[1] - n[0] + 1
}

/**
 * Render
 *
 * @param content Content to be rendered
 * @param options Options for the color method
 * @returns Rendered content
 */
const hash = (content: string, options?: Partial<HashOptions>): string => {
  const val: HashOptions = {
    s: [60, 100],
    v: [80, 100],
    background: false,
    renderOptions: {},
    ...options,
  }

  const base = {
    s: getBase(val.s),
    v: getBase(val.v),
  }

  const range = {
    s: getRange(val.s),
    v: getRange(val.v),
  }

  const scope = 360 * range.s * range.v
  let hash = scope
  for (let i = 0; i < content.length; i++) {
    hash = (hash << 3) | content.charCodeAt(i)
    hash %= scope
  }

  hash = Math.abs(hash) % (360 * range.s * range.v)
  const v = hash % range.v + base.v
  hash = Math.floor(hash / range.v)
  const s = hash % range.s + base.s
  hash = Math.floor(hash / range.s)
  const h = hash % 360

  const colorField = val.background ? 'background' : 'color'
  return render({
    ...val.renderOptions,
    content: content,
    [colorField]: hsv2rgb(h, s, v),
  })
}

export default hash
export { HashOptions }