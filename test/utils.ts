export const CharEscape = '\x1b\\[[\\d;]*m.*\x1b\\[0m'
export const EachCharRegExp = new RegExp(CharEscape.repeat(4))
export const ColorRegExp = /\x1b\[38;2;\d{1,3};\d{1,3};\d{1,3}m.*\x1b\[0m/
export const BgRegExp = /\x1b\[48;2;\d{1,3};\d{1,3};\d{1,3}m.*\x1b\[0m/