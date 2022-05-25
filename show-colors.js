const r = require('./index')
const { presetColors } = require('./index')

const width = 80
const space = 10
const column = Math.floor(width / space)

const pad = str => ' '.repeat(space - str.length)
const cap = str => str[0].toUpperCase() + str.slice(1)

let line = ''
let count = 0

const title = 'All Available Preset Colors'

console.log(
  ' '.repeat(Math.floor((width - title.length) / 2) - 4),
  r.gray('--- '),
  r.u().rainbow(title, { offset: 'random' }),
  r.gray(' ---'),
)

for (let i = 4; i < presetColors.length; i++) {
  const color = presetColors[i]
  line += r[color](cap(color)) + pad(color)
  count++

  if (count >= column) {
    console.log(line)
    line = ''
    count = 0
  }
}

console.log(line)