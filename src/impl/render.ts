/* eslint-disable no-control-regex */

import type { ColorTuple } from './types'

const segmentStyles = [
  'reset',
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

type SegmentStyles = typeof segmentStyles[number]

type SegmentStylesDeduped = Exclude<SegmentStyles, 'b' | 'i' | 'u' | 's'>

const expandStyle = (style: SegmentStyles): SegmentStylesDeduped => {
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

type SegmentStylesOptions = { [S in SegmentStylesDeduped]: boolean }

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

  // A trick is used here that uses '\x1b[0m\x1b[0' to identify whether the
  // escape sequence is the start or the end of the segment.
  if (s.reset) ctrl += '0m\x1b[0;'

  if (s.bold) ctrl += '1;'
  if (s.dim) ctrl += '2;'
  if (s.italic) ctrl += '3;'
  if (s.underline) ctrl += '4;'
  if (s.blink) ctrl += '5;'
  if (s.inverse) ctrl += '7;'
  if (s.hidden) ctrl += '8;'
  if (s.strikethrough) ctrl += '9;'

  if (typeof s.color === 'string') ctrl += `38;${s.color};`
  else if (s.color) ctrl += `38;2;${s.color.join(';')};`

  if (typeof s.background === 'string') ctrl += `48;${s.background};`
  else if (s.background) ctrl += `48;2;${s.background.join(';')};`

  // Return unaltered string if no style is passed.
  if (ctrl === '\x1b[') return s.content
  ctrl = ctrl.slice(0, ctrl.length - 1) + 'm'

  let content = s.content

  if (ctrl != '\x1b[0m\x1b[0m') {
    // Append the parsed escape sequence to the end of existing reset sequences.
    content = content.replace(/(?<!\x1b\[0m)\x1b\[0m(?!\x1b\[0)/g, `\x1b[0m${ctrl}`)
  }

  const start = content.startsWith('\x1b[') ? '' : ctrl
  let rendered = start + content + '\x1b[0m'

  // Delete escape sequence between two \x1b[0m.
  rendered = rendered.replace(/\x1b\[0m(\x1b\[[0-9;]+m)+\x1b\[0m/g, '\x1b[0m')

  return rendered
}

export default render
export { segmentStyles, expandStyle }
export type { SegmentOptions, SegmentStyles, SegmentStylesDeduped }