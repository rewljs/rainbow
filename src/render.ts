import type { ColorTuple } from './types'

const segmentStyles = [
  'bold',
  'b',
  'dim',
  'italic',
  'i',
  'underline',
  'u',
  'blink',
  'inverse',
  'hidden',
  'strikethrough',
  's',
] as const

type SegmentStylesWithShorthands = typeof segmentStyles[number]

type SegmentStyles = Exclude<SegmentStylesWithShorthands, 'b' | 'i' | 'u' | 's'>

const expandShorthand = (style: SegmentStylesWithShorthands): SegmentStyles => {
  switch (style) {
    case 'b':
      return 'bold'
    case 'i':
      return 'italic'
    case 'u':
      return 'underline'
    case 's':
      return 'strikethrough'
  }
  return style
}

type SegmentStylesOptions = { [S in SegmentStyles]: boolean }

interface SegmentOptions extends Partial<SegmentStylesOptions> {
  color?: ColorTuple | string
  background?: ColorTuple | string
}

interface SegmentContent {
  content: string
}

type Segment = SegmentContent & SegmentOptions

const render = (s: Segment): string => {
  let ctrl = '\x1b['

  if (s.bold) ctrl += '1;'
  if (s.dim) ctrl += '2;'
  if (s.italic) ctrl += '3;'
  if (s.underline) ctrl += '4;'
  if (s.blink) ctrl += '5;'
  if (s.inverse) ctrl += '7;'
  if (s.hidden) ctrl += '8;'
  if (s.strikethrough) ctrl += '9;'

  if (typeof s.color == 'string') ctrl += `38;${s.color};`
  else if (s.color) ctrl += `38;2;${s.color.join(';')};`

  if (typeof s.background == 'string') ctrl += `48;${s.background};`
  else if (s.background) ctrl += `48;2;${s.background.join(';')};`

  ctrl = ctrl.slice(0, ctrl.length - 1) + 'm'

  // eslint-disable-next-line no-control-regex
  const content = s.content.replace(/\x1b\[0m(?!\x1b|$)/g, `\x1b[0m${ctrl}`)

  const start = content.startsWith('\x1b[') ? '' : ctrl
  const end = content.endsWith('\x1b[0m') ? '' : '\x1b[0m'

  return start + content + end
}

export default render
export { segmentStyles, expandShorthand }
export type { SegmentOptions, SegmentStylesWithShorthands, SegmentStyles }