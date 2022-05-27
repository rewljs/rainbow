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

const showColors = (colors, set) => {
  let line = ''
  let count = 0

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i]
    let ctx = r
    if (set) ctx = ctx[set]
    line += ctx[color](cap(color)) + pad(color)
    count++

    if (count >= column) {
      console.log(line)
      line = ''
      count = 0
    }
  }

  if (line) console.log(line)
}

console.log(r.v90('Grayscales:'))
showColors(ColorList.slice(16, 20))
showColors(ColorList.slice(20))

console.log(r.v90('Colors:'))
showColors(ColorList.slice(0, 16))

console.log(r.v90(`Colors ${r.v60('(dark)')}:`))
showColors(ColorList.slice(0, 16), 'dark')

console.log(r.v90(`Colors ${r.v60('(light)')}:`))
showColors(ColorList.slice(0, 16), 'light')