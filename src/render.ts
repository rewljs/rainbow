import type { ColorTuple } from './types'

interface SegmentWithCustomEscape {
  content: string
  escape: string
}

interface SegmentWithOptions {
  content: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  invert?: boolean
  color?: ColorTuple
  background?: ColorTuple
}

interface Segment {
  content: string
  escape?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  invert?: boolean
  color?: ColorTuple
  background?: ColorTuple
}

type IRender = {
  (s: SegmentWithCustomEscape): string
  (s: SegmentWithOptions): string
}

const render: IRender = (s: Segment): string => {
  let ctrl: string

  if (s.escape) ctrl = s.escape
  else {
    ctrl = '\x1b['
    if (s.bold) ctrl += '1;'
    if (s.italic) ctrl += '3;'
    if (s.underline) ctrl += '4;'
    if (s.invert) ctrl += '7;'
    if (s.color) ctrl += `38;2;${s.color.join(';')};`
    if (s.background) ctrl += `48;2;${s.background.join(';')};`
    ctrl = ctrl.slice(0, ctrl.length - 1) + 'm'
  }

  // eslint-disable-next-line no-control-regex
  const content = s.content.replace(/\x1b\[0m(?!\x1b|$)/g, `\x1b[0m${ctrl}`)

  const start = content.startsWith('\x1b[') ? '' : ctrl
  const end = content.endsWith('\x1b[0m') ? '' : '\x1b[0m'

  return start + content + end
}

export default render
export type { Segment }