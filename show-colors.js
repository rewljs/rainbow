const r = require('./index')
const { ColorList } = require('./index')

const width = 80
const space = 10
const column = Math.floor(width / space)

const pad = str => ' '.repeat(space - str.length)
const cap = str => str[0].toUpperCase() + str.slice(1)

const title = 'All Available Preset Colors'

console.log(
  ' '.repeat(Math.floor((width - title.length) / 2) - 4),
  r.gray('--- '),
  r.u().rainbow(title),
  r.gray(' ---'),
)

const showColors = colors => {
  let line = ''
  let count = 0

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i]
    line += r[color](cap(color)) + pad(color)
    count++

    if (count >= column) {
      console.log(line)
      line = ''
      count = 0
    }
  }

  console.log(line)
}

showColors(ColorList.default)