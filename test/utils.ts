export const CharEscape = '\x1b\\[[\\d;]*m.*\x1b\\[0m'
export const TestRegExp = new RegExp(CharEscape.repeat(4))