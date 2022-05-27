const r = require('./index')
const { ColorList } = require('./index')

const width = 80

const pad = (str, n = 10) => ' '.repeat(n - str.length)
const cap = str => str[0].toUpperCase() + str.slice(1)
const half = str => Math.floor((width - str.length) / 2)
const enter = () => console.log('')

const showTitle = (title, offset = 0, span = 360) => {
  console.log(
    ' '.repeat(half(title) - 4),
    r.gray('--- '),
    r.black().u().rainbow(title, { offset, span }),
    r.gray(' ---'),
  )
}

const methodUsingWhiteBg = ['black', 'gray', ...ColorList.slice(20, 25)]

const showMethods = (names, nameWidth = 10, set) => {
  const column = Math.floor(width / nameWidth)
  let line = ''
  let count = 0

  for (const name of names) {
    let ctx = r
    if (set) ctx = ctx[set]
    let word = ctx[name](cap(name)) + pad(name, nameWidth)
    if (methodUsingWhiteBg.includes(name)) word = r.bg.v90(word)
    line += word
    count++

    if (count >= column) {
      console.log(line)
      line = ''
      count = 0
    }
  }

  if (line) console.log(line)
}

showTitle(' All Available Preset Styles And Colors ')
enter()
showTitle(' Styles ', 120, 120)

showMethods(['bold', 'italic', 'underline', 'strikethrough'], 20)
showMethods(['dim', 'blink', 'inverse', 'hidden'], 20)
enter()

showTitle(' Colors ', 240, 120)
console.log('Default:')
showMethods(ColorList.slice(0, 16))
console.log('Dark:')
showMethods(ColorList.slice(0, 16), 10, 'dark')
console.log('Light:')
showMethods(ColorList.slice(0, 16), 10, 'light')
console.log('Grayscales:')
showMethods(ColorList.slice(16, 20))
showMethods(ColorList.slice(20, 25))
showMethods(ColorList.slice(25))